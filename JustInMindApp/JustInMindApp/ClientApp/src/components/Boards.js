import React from 'react';

import { TaskView } from './TaskView';
import { BsPencil } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { TaskColorData } from './TaskColorData';
import { LoadingPage } from './LoadingPage';
import { BsTrashFill } from "react-icons/bs";

import '../styles/board.css'

export class Boards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boards: [
                { id: 1, title: "New", tasks: [] },
                { id: 2, title: "Investigation", tasks: [] },
                { id: 3, title: "Active", tasks: [] },
                { id: 4, title: "In Test", tasks: [] },
                { id: 5, title: "Done", tasks: [] },
            ],
            boardForTaskPut: [],
            draggedTask: null,
            taskToView: null,
            isTaskViewOpen: false,
        };      
    }

    componentDidMount() {
        this.fetchGetAllTasks();
    }

    fetchGetAllTasks = () => {
        fetch('https://localhost:44330/Task/getAll')
            .then(response => response.json())
            .then(data => this.setTasksToBoards(data, this.state.boards))
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
                boards: boards
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        fetch('https://localhost:44330/Task', requestOptions);
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
            headers: { 'Content-Type': 'application/json' }
        }

        fetch('https://localhost:44330/Task/' + taskId, requestOptions);
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
                task: null
            })
        }

        this.setState({
            isTaskViewOpen: isOpen
        })
    }

    submitTask() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.taskToView)
        }

        fetch('https://localhost:44330/Task', requestOptions)
            .then(response => response.status)
    }

    changeTaskData = (taskName, taskDescription) => {
        this.state.taskToView.name = taskName;
        this.state.taskToView.description = taskDescription;

        this.submitTask();
    }

    changeTaskComments = (comment) => {
        let task = this.state.taskToView
        task.comments.push({ taskId: this.state.taskToView.id, text: comment, userId: 11});

        this.setState({
            taskToView: task
        })

        this.submitTask();
    }
    
    render() {

        if (this.state.boards[1].tasks.length == 0) {
            return (
                <LoadingPage />
            )
        }
        else {
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

                    <TaskView open={this.state.isTaskViewOpen} task={this.state.taskToView} changeOpen={this.changeIsTaskViewOpen} changeTaskData={this.changeTaskData} changeTaskComments={this.changeTaskComments}/>
                </div>
            );
        }
    }
}
