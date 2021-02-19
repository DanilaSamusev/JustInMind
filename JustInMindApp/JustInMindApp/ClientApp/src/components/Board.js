import React from 'react';
import '../styles/board.css'

export class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			boards: [
            { id: 1, title: "New", items: [{ id: 1, title: "1" }, { id: 2, title: "2" }, { id: 3, title: "3" }] },
            { id: 2, title: "In Progress", items: [{ id: 4, title: "4" }, { id: 5, title: "5" }, { id: 6, title: "6" }] },
            { id: 3, title: "Done", items: [{ id: 7, title: "7" }, { id: 8, title: "8" }, { id: 9, title: "9" }] },
        ],
			currentBoard: [],
			currentItem: null,
		};

		this.dragStartHandler = this.dragStartHandler.bind(this);
		this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
		this.dragEndHandler = this.dragEndHandler.bind(this);
		this.dragOverHandler = this.dragOverHandler.bind(this);
		this.dropCardHandler = this.dropCardHandler.bind(this);
		this.get = this.get.bind(this);
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

								draggable={true}
							>{item.title}</div>
						)}
					</div>
				)}

			</div>
		);
	}
}
