import React from 'react';
import { BsPencil } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { TaskView } from '../TaskView';
import AddTaskField from '../AddTaskField';
import { TaskColorData } from '../TaskColorData';
import { LoadingPage } from '../LoadingPage';
import FetchHelper from '../../Helpers/FetchHelper';

import '../../styles/board.css'

export class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: null,
            boardForTaskPut: [],
            draggedTask: null,
            taskToView: null,
            isTaskViewOpen: false,
            isPageLoaded: false,
            isFieldVisible: [],
        };
    }

    componentDidMount() {
        if (this.props.project == null) {
            return
        }

        this.refreshTasks();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.project !== this.props.project) {
            this.refreshTasks();
        }

        return true;
    }

    refreshTasks = async () => {
        this.setState({
            boards: [
                { id: 0, title: "New", tasks: [] },
                { id: 1, title: "Investigation", tasks: [] },
                { id: 2, title: "Active", tasks: [] },
                { id: 3, title: "In Test", tasks: [] },
                { id: 4, title: "Done", tasks: [] },
            ],
        })

        let response = await FetchHelper.fetchGet('task/getAll?projectId=' + this.props.project.id, localStorage.token);
        let result = await this.props.validateFetchResponse(response);

        console.log(result)

        if (result) {

            this.setTasksToBoards(result, this.state.boards);
        }
    }

    updateTask = async (task) => {
        let response = await FetchHelper.fetchPut('task', localStorage.token, task);
        this.props.validateFetchResponse(response);
    }

    deleteTask = (board, task) => {

        let index = board.tasks.indexOf(task)
        board.tasks.splice(index, 1)

        this.setState(
            {
                boards: this.refreshBoard(board),
            })

        this.fetchDeleteTask(task.id);
    }

    fetchDeleteTask = (taskId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('task/' + taskId, requestOptions)
            .then(response => {
                if (response.status == 401) {
                    this.props.openSnackbar(true, 'error', 'You are not authorized!')
                    this.props.setIsAuthorized(false);
                }
            });
    }

    dragStartHandler = (event, board, task) => {
        this.setState(
            {
                boardForTaskPut: board,
                draggedTask: task,
            })
    }

    dropCardHandler = (event, board) => {
        board.tasks.push(this.state.draggedTask)
        this.state.draggedTask.stateId = board.id;

        let currentIndex = this.state.boardForTaskPut.tasks.indexOf(this.state.draggedTask)
        this.state.boardForTaskPut.tasks.splice(currentIndex, 1)

        this.setState(
            {
                boards: this.refreshBoard(board),
            })

        this.updateTask(this.state.draggedTask);
    }

    setTasksToBoards = (tasks, boards) => {
        tasks.forEach((task) => {
            boards.find((board) => { return board.id == task.stateId }).tasks.push(task);
        });

        this.setState(
            {
                boards: boards,
                isPageLoaded: true
            })
    }

    refreshBoard = (board) => {
        let boards = this.state.boards.map(item => {
            if (item.id === board.id) {
                return board
            }

            if (item.id === this.state.boardForTaskPut.id) {
                return this.state.boardForTaskPut
            }

            return item
        })

        return boards;
    }

    chooseTaskToModify = (task, isOpen) => {
        this.setState({
            taskToView: task
        });

        this.changeIsTaskViewOpen(isOpen);
    }

    changeIsTaskViewOpen = (isOpen) => {

        if (isOpen === false) {
            this.setState({
                taskToView: null
            })
        }

        this.setState({
            isTaskViewOpen: isOpen
        })
    }

    addTaskToBoard = (boardId, task) => {
        let newBoards = this.state.boards;
        newBoards[boardId].tasks.push(task);
        this.setState({
            boards: newBoards,
        });
        this.changeFieldVisibility(boardId);
    }

    changeFieldVisibility = (boardId) => {
        let isCurrentFieldVisible = this.state.isFieldVisible;
        isCurrentFieldVisible[boardId] = !isCurrentFieldVisible[boardId];
        this.setState({
            isFieldVisible: isCurrentFieldVisible,
        });
    }

    getTaskId = () => {
        if (this.state.taskToView == null) {
            return null
        }
        else {
            return this.state.taskToView.id
        }
    }

    render() {
        if (this.props.project == null) {
            return (
                <h1>No project selected</h1>
            )
        }

        if (!this.state.isPageLoaded) {
            return (
                <LoadingPage />
            )
        }

        return (
            <div>
                <div>
                    <h1>{this.props.project.name}</h1>
                </div>
                <div className='tasksExplorer'>
                    {this.state.boards.map(board =>
                        <div className='board'
                            key={board.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => this.dropCardHandler(e, board)}
                        >
                            <div className='board_title'>{board.title}</div>
                            {board.tasks.map(task =>
                                <div
                                    className='task'
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragStart={(e) => this.dragStartHandler(e, board, task)}
                                    key={task.id}
                                    draggable={true}
                                    style={{ border: '2px solid ' + TaskColorData.find((e) => e.id == task.categoryId).color }}
                                >
                                    <div>{task.name}</div>
                                    <div className='pencilIcon'>
                                        <BsPencil onClick={() => this.chooseTaskToModify(task, true)} onMouseEnter={(event) => event.target.style.cursor = 'pointer'} />
                                    </div>
                                    <div className='trashIcon'>
                                        <BsTrashFill onClick={() => this.deleteTask(board, task)} onMouseEnter={(event) => event.target.style.cursor = 'pointer'} />
                                    </div>
                                </div>
                            )}

                            {this.state.isFieldVisible[board.id]
                                ?
                                <AddTaskField changeFieldVisibility={this.changeFieldVisibility} addTaskToBoard={this.addTaskToBoard} board={board} project={this.props.project} />
                                :
                                <Button
                                    className="add-button"
                                    color="primary"
                                    fullWidth
                                    startIcon={<AddIcon />}
                                    onClick={() => this.changeFieldVisibility(board.id)}
                                >
                                    Add task
                                    </Button>
                            }
                        </div>
                    )}
                </div>

                <TaskView taskId={this.getTaskId()} open={this.state.isTaskViewOpen} changeOpen={this.changeIsTaskViewOpen} reloadBoard={this.refreshTasks} />
            </div>
        );
    }
}
