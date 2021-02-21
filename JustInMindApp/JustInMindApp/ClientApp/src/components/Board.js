import React from 'react';
import '../styles/board.css'

export class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boards: [
                { id: 1, title: "New", items: [] },
                { id: 2, title: "Investigation", items: [] },
                { id: 3, title: "Active", items: [] },
                { id: 4, title: "In Test", items: [] },
                { id: 5, title: "Done", items: [] },
            ],
            currentBoard: [],
            currentItem: null,
        };

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.dragEndHandler = this.dragEndHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropCardHandler = this.dropCardHandler.bind(this);
        this.setBoardTasks = this.setBoardTasks.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.get = this.get.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    dragStartHandler(e, board, item) {
        this.setState(
            {
                currentBoard: board,
                currentItem: item,
            })
    }

    dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 2px 3px gray'
        }

    }

    dropCardHandler(e, board) {
        board.items.push(this.state.currentItem)

        const currentIndex = this.state.currentBoard.items.indexOf(this.state.currentItem)
        this.state.currentBoard.items.splice(currentIndex, 1)

        this.setState(
            {
                boards: this.get(board)
            })
    }

    getTasks() {
        fetch('https://localhost:44330/Task/getAll')
            .then(response => response.json())
            .then(data => this.setBoardTasks(data, this.state.boards))
    }

    setBoardTasks(tasks, boards) {

        tasks.forEach((task) => {
            boards.find((element) => { return element.id == task.stateId }).items.push(task);
        });

        this.setState(
            {
                boards: boards
            })
    }

    get(board) {
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

    render() {
        return (
            <div className='tasksExplorer'>
                {this.state.boards.map(board =>
                    <div className='board'
                        key={board.id}
                        onDragOver={(e) => this.dragOverHandler(e)}
                        onDrop={(e) => this.dropCardHandler(e, board)}
                    >
                        <div className='board_title'>{board.title}</div>
                        {board.items.map(item =>
                            <div
                                className='item'
                                onDragOver={(e) => this.dragOverHandler(e, board, item)}
                                onDragLeave={(e) => this.dragLeaveHandler(e)}
                                onDragStart={(e) => this.dragStartHandler(e, board, item)}
                                onDragEnd={(e) => this.dragEndHandler(e)}
                                key={item.id}
                                draggable={true}
                            >{item.name}</div>
                        )}
                    </div>
                )}

            </div>
        );
    }
}
