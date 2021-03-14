import React from 'react';

import Navbar from './Navbar';
import { TaskView } from './TaskView';
import { BsPencil } from "react-icons/bs";
import { Redirect } from 'react-router-dom';
import { LoadingPage } from './LoadingPage';
import { BsTrashFill } from "react-icons/bs";
import { TaskColorData } from './TaskColorData';

import '../styles/board.css'

export class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [
                { id: 0, title: "New", tasks: [] },
                { id: 1, title: "Investigation", tasks: [] },
                { id: 2, title: "Active", tasks: [] },
                { id: 3, title: "In Test", tasks: [] },
                { id: 4, title: "Done", tasks: [] },
            ],
            boardForTaskPut: [],
            draggedTask: null,
            taskToView: null,
            isTaskViewOpen: false,
            isPageLoaded: false,
            isAuthorized: true,
        };
    }

    componentDidMount() {
        this.fetchGetAllTasks();
    }

    fetchGetAllTasks = () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        }

        fetch('task/getAll', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');

                    this.setState({
                        isAuthorized: false,
                    });
                }
                else {
                    response.json().
                        then(data => {

                            this.setState({
                                isAuthorized: true,
                            })
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
        this.state.draggedTask.state.id = board.id;

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
            boards.find((board) => { return board.id == task.state.id }).tasks.push(task);
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

                    this.setState({
                        isAuthorized: false,
                    });
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

                    this.setState({
                        isAuthorized: false,
                    });
                }
            });;
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

                    this.setState({
                        isAuthorized: false,
                    });
                }
            });
    }

    changeTaskData = (taskName, taskDescription) => {
        this.state.taskToView.name = taskName;
        this.state.taskToView.description = taskDescription;

        this.submitTask();
    }

    changeTaskComments = (comment) => {
        let task = this.state.taskToView
        task.comments.push({ taskId: this.state.taskToView.id, text: comment, userId: 11 });

        this.setState({
            taskToView: task
        })

        this.submitTask();
    }

    render() {
        if (!this.state.isAuthorized) {
            return (
                <Redirect to='/login' />
            )
        }

        if (!this.state.isPageLoaded) {
            return (
                <LoadingPage />
            )
        }
        else {
            return (
                <div>
                    <Navbar />

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
                                        style={{ border: '2px solid ' + TaskColorData.find((e) => e.category == task.category.name).color }}
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



                            </div>
                        )}

                        <TaskView open={this.state.isTaskViewOpen} task={this.state.taskToView} changeOpen={this.changeIsTaskViewOpen} changeTaskData={this.changeTaskData} changeTaskComments={this.changeTaskComments} />
                    </div>
                </div>
            );
        }
    }
}
