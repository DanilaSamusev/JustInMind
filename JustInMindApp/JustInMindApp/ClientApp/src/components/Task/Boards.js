import React from 'react';
import { BsPencil } from "react-icons/bs";

import { TaskView } from '../TaskView';
import AddTaskField from '../AddTaskField';
import { TaskColorData } from '../TaskColorData';
import { LoadingPage } from '../LoadingPage';
import { BsTrashFill } from "react-icons/bs";

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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
        this.fetchGetAllTasks();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.project !== this.props.project) {
            this.fetchGetAllTasks();
        }

        return true;
    }

    fetchGetAllTasks = () => {
        this.setState({
            boards: [
                { id: 0, title: "New", tasks: [] },
                { id: 1, title: "Investigation", tasks: [] },
                { id: 2, title: "Active", tasks: [] },
                { id: 3, title: "In Test", tasks: [] },
                { id: 4, title: "Done", tasks: [] },
            ],
        })

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        }

        fetch('task/getAll?projectId=' + this.props.project.id, requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
                else {
                    response.json()
                        .then(data => {
                            this.setTasksToBoards(data, this.state.boards);
                        });
                }
            })
    }

    dragStartHandler = (event, board, task) => {
        this.setState(
            {
                boardForTaskPut: board,
                draggedTask: task,
            })
    }

    dragLeaveHandler = (event) => {
        event.target.style.boxShadow = 'none'
    }

    dragEndHandler = (event) => {
        event.target.style.boxShadow = 'none'
    }

    dragOverHandler = (event) => {
        event.preventDefault();

        if (event.target.className == 'task') {
            event.target.style.boxShadow = '0 2px 3px gray'
        }
    }

    dropCardHandler = (event, board) => {
        board.tasks.push(this.state.draggedTask)
        this.state.draggedTask.stateId = board.id;

        const currentIndex = this.state.boardForTaskPut.tasks.indexOf(this.state.draggedTask)
        this.state.boardForTaskPut.tasks.splice(currentIndex, 1)

        this.setState(
            {
                boards: this.refreshBoard(board),
            })

        this.fetchUpdateTask(this.state.draggedTask);
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

    fetchUpdateTask = (task) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(task)
        }

        fetch('task', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
            });
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
                    alert('You are not authorized!');
                }
            });
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

    submitTask() {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(this.state.taskToView)
        }

        fetch('task', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
            });
    }

    onAddTaskFieldBlur = (boardId) => {
        this.changeFieldVisibility(boardId);
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

    changeTaskComments = (comment) => {
        let task = this.state.taskToView
        task.comments.push({ taskId: this.state.taskToView.id, text: comment, userId: 11 });

        this.setState({
            taskToView: task
        })

        this.submitTask();
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
        if (!this.state.isPageLoaded) {
            return (
                <LoadingPage />
            )
        }

        return (
            <div className='tasksExplorer'>
                {this.state.boards.map(board =>
                    <div className='board'
                        key={board.id}
                        onDragOver={(e) => this.dragOverHandler(e)}
                        onDrop={(e) => this.dropCardHandler(e, board)}
                    >
                        <div className='board_title'>{board.title}</div>
                        {board.tasks.map(task =>
                            <div
                                className='task'
                                onDragOver={(e) => this.dragOverHandler(e, board, task)}
                                onDragLeave={(e) => this.dragLeaveHandler(e)}
                                onDragStart={(e) => this.dragStartHandler(e, board, task)}
                                onDragEnd={(e) => this.dragEndHandler(e)}
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

                <TaskView taskId={this.getTaskId()} open={this.state.isTaskViewOpen} changeOpen={this.changeIsTaskViewOpen} reloadBoard={this.fetchGetAllTasks} />
            </div>
        );
    }
}
