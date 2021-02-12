import React, { useState } from 'react';
import '../tasksExplorer.css'

export const Counter = () => {

	const [boards, setBoards] = useState(
		[
			{ id: 1, title: "New", items: [{ id: 1, title: "1" }, { id: 2, title: "2" }, { id: 3, title: "3" }] },
			{ id: 2, title: "In Progress", items: [{ id: 4, title: "4" }, { id: 5, title: "5" }, { id: 6, title: "6" }] },
			{ id: 3, title: "Done", items: [{ id: 7, title: "7" }, { id: 8, title: "8" }, { id: 9, title: "9" }] },
		])

	const [currentBoard, setCurrentBoard] = useState(null)
	const [currentItem, setCurrentItem] = useState(null)

	function dragStartHandler(e, board, item) {
		setCurrentBoard(board)
		setCurrentItem(item)
	}

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none'
	}

	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none'
	}

	function dragOverHandler(e) {
		e.preventDefault()
		if (e.target.className == 'item') {
			e.target.style.boxShadow = '0 2px 3px gray'
		}

	}

	function dropHandler(e, board, item) {
		e.preventDefault()
		const currentIndex = currentBoard.items.indexOf(currentItem)
		currentBoard.items.splice(currentIndex, 1)

		const dropIndex = board.items.indexOf(item)
		board.items.splice(dropIndex + 1, 0, currentItem)

		setBoards(boards.map(b => {
			if (b.id === board.id) {
				return board
			}
			if (b.id === currentBoard.id) {
				return currentBoard
			}
			return b
		}))
	}

	function dropCardHandler(e, board) {		
		board.items.push(currentItem)

		const currentIndex = currentBoard.items.indexOf(currentItem)
		currentBoard.items.splice(currentIndex, 1)

		setBoards(boards.map(b => {
			if (b.id === board.id) {
				return board
			}
			if (b.id === currentBoard.id) {
				return currentBoard
			}
			return b
		}))
	}

	return (
		<div className='tasksExplorer'>
			{boards.map(board =>
				<div className='board'
					onDragOver={(e) => dragOverHandler(e)}
					onDrop={(e) => dropCardHandler(e, board)}
				>
					<div className='board_title'>{board.title}</div>
					{board.items.map(item =>
						<div
							className='item'
							onDragOver={(e) => dragOverHandler(e, board, item)}
							onDragLeave={(e) => dragLeaveHandler(e)}
							onDragStart={(e) => dragStartHandler(e, board, item)}
							onDragEnd={(e) => dragEndHandler(e)}
							
							draggable={true}
						>{item.title}</div>
					)}
				</div>
			)}

		</div>
	);
}