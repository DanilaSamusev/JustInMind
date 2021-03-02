import React from 'react';

import { TaskView } from './TaskView';
import { BsPencil } from "react-icons/bs";
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
            currentBoard: [],
            selectedTask: null,
            task: null,
            isOpen: false,
        };      
    }

    componentDidMount() {
        this.getTasks();
    }

    dragStartHandler = (event, board, task) => {

        this.setState(
            {
                currentBoard: board,
                selectedTask: task,
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
        board.tasks.push(this.state.selectedTask)
        this.state.selectedTask.stateId = board.id;

        const currentIndex = this.state.currentBoard.tasks.indexOf(this.state.selectedTask)
        this.state.currentBoard.tasks.splice(currentIndex, 1)

        this.setState(
            {
                boards: this.get(board),
            })

        this.fetchUpdateTask(this.state.selectedTask);
    }

    getTasks = () => {
        fetch('https://localhost:44330/Task/getAll')
            .then(response => response.json())
            .then(data => this.setBoardTasks(data, this.state.boards))
    }

    setBoardTasks = (tasks, boards) => {
        tasks.forEach((task) => {
            boards.find((board) => { return board.id == task.stateId }).tasks.push(task);
        });

        this.setState(
            {
                boards: boards
            })
    }

    get = (board) => {
        let boards = this.state.boards.map(b => {
            if (b.id === board.id) {
                return board
            }

            if (b.id === this.state.currentBoard.id) {
                return this.state.currentBoard
            }
            return b
        })

        return boards;
    }

    fetchUpdateTask = (task) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        fetch('https://localhost:44330/Task', requestOptions)
            .then(response => response.status)
            .then((r) => console.log(r));
    }

    deleteTask = (board, task) => {

        let index = board.tasks.indexOf(task)
        board.tasks.splice(index, 1)

        this.setState(
            {
                boards: this.get(board),
            })

        this.fetchDeleteTask(task.id);
    }

    fetchDeleteTask = (taskId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch('https://localhost:44330/Task/' + taskId, requestOptions)
            .then(response => response.status)
            .then((r) => console.log(r));
    }

    chooseTaskToModify = (taskId, isOpen) => {
        fetch('https://localhost:44330/Task/' + taskId)
            .then(response => response.json())
            .then(data => this.setState({
                task: data
            }))

        this.changeOpen(isOpen)
    }

    changeOpen = (isOpen) => {

        if (isOpen === false) {
            this.setState({
                task: null
            })
        }

        this.setState({
            isOpen: isOpen
        })
    }

    render() {

        if (this.state.boards[0].tasks.length == 0) {
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
                                >
                                    <div>{task.name}</div>
                                    <div className='pencilIcon'>
                                        <BsPencil onClick={() => this.chooseTaskToModify(task.id, true)} onMouseEnter={(event) => event.target.style.cursor = 'pointer'} />
                                    </div>
                                    <div className='trashIcon'>
                                        <BsTrashFill onClick={() => this.deleteTask(board, task)} onMouseEnter={(event) => event.target.style.cursor = 'pointer'} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <TaskView open={this.state.isOpen} task={this.state.task} changeOpen={this.changeOpen} />
                </div>
            );
        }
    }
}
