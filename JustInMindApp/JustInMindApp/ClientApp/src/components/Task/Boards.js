import React, { useState, useEffect } from 'react';
import { BsPencil } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { TaskColorData } from '../../ComponentsData/TaskColorData';
import FetchHelper from '../../Helpers/FetchHelper';

import '../../styles/board.css'
import AddTaskField from './AddTaskField';
import { TaskView } from './TaskView';

export default function Boards(props) {
    const classes = useStyles();

    const [boards, setBoards] = useState(null);
    const [draggedBoard, setDraggedBoard] = useState(null);
    const [draggedTask, setDraggedTask] = useState(null);
    const [taskToView, setTaskToView] = useState(null);
    const [isTaskViewOpen, setIsTaskViewOpen] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(null);
    const [isFieldVisible, setIsFieldVisible] = useState([false, false]);

    useEffect(() => {
        if (props.project == null) {
            return
        }

        refreshTasks();
    }, [props.project]);

    const refreshTasks = async () => {
        let response = await FetchHelper.fetchGet('task/getAll?projectId=' + props.project.id, localStorage.token);
        let isOk = await props.validateFetchResponse(response);

        if (isOk) {
            let tasks = await response.json();

            if (tasks != null) {
                setTasksToBoards(tasks);
            }
        }
    }

    const updateTask = async (task) => {
        let response = await FetchHelper.fetchPut('task', localStorage.token, task);
        props.validateFetchResponse(response);
    }

    const deleteTask = async (task) => {
        await fetchDeleteTask(task.id);
        await refreshTasks();
    }

    const fetchDeleteTask = (taskId) => {
        let deleteTaskResponse = FetchHelper.fetchDelete('task/' + taskId, localStorage.token)
        props.validateFetchResponse(deleteTaskResponse);
    }

    const dragStartHandler = (event, draggedBoard, draggedTask) => {
        setDraggedBoard(draggedBoard);
        setDraggedTask(draggedTask);
    }

    const dropCardHandler = (event, board) => {
        board.tasks.push(draggedTask)

        let task = draggedTask;
        task.stateId = board.id;
        setDraggedTask(task);

        let currentIndex = draggedBoard.tasks.indexOf(draggedTask)
        draggedBoard.tasks.splice(currentIndex, 1)

        setBoards(refreshBoard(board));

        updateTask(draggedTask);
    }

    const setTasksToBoards = (tasks) => {
        let boards =
            [
                { id: 0, title: "New", tasks: [] },
                { id: 1, title: "Investigation", tasks: [] },
                { id: 2, title: "Active", tasks: [] },
                { id: 3, title: "In Test", tasks: [] },
                { id: 4, title: "Done", tasks: [] },
            ];

        tasks.forEach((task) => {
            boards.find((board) => { return board.id == task.stateId }).tasks.push(task);
        });

        setBoards(boards);
        setIsPageLoaded(true);
    }

    // very strange logic and I need to change it!
    const refreshBoard = (board) => {
        let newBoards = boards.map(item => {
            // that means, we put the task to board in 'dropCardHandler' and return this board instead of old unchaged. 
            if (item.id === board.id) {
                return board
            }

            // that means, we cut the task from dragged board in 'dropCardHandler' and return this board instead of old unchaged. 
            if (item.id === draggedBoard.id) {
                return draggedBoard
            }

            return item
        })

        return newBoards;
    }

    const chooseTaskToModify = (task, isOpen) => {
        setTaskToView(task);
        changeIsTaskViewOpen(isOpen);
    }

    const changeIsTaskViewOpen = (isOpen) => {
        if (isOpen === false) {
            setTaskToView(null)
        }

        setIsTaskViewOpen(isOpen)
    }

    const addTaskToBoard = (boardId, task) => {
        let newBoards = boards;
        newBoards[boardId].tasks.push(task);
        setBoards(newBoards);
        changeFieldVisibility(boardId);
    }

    const changeFieldVisibility = (boardId) => {
        let isCurrentFieldVisible = isFieldVisible;
        isCurrentFieldVisible[boardId] = !isCurrentFieldVisible[boardId];
        setIsFieldVisible([...isCurrentFieldVisible]);
    }

    const getTaskId = () => {
        if (taskToView == null) {
            return null
        }
        else {
            return taskToView.id
        }
    }

    if (props.project == null) {
        return (
            <h1 className={classes.projectName}>No project selected</h1>
        )
    }

    if (!isPageLoaded) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <div className='tasksExplorer'>
                {boards.map(board =>
                    <div className={classes.board}
                        key={board.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => dropCardHandler(e, board)}
                    >
                        <div className='board_title'>{board.title}</div>
                        <div className={classes.tasks}>
                            {
                                board.tasks.map(task =>
                                    <div
                                        className='task'
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragStart={(e) => dragStartHandler(e, board, task)}
                                        key={task.id}
                                        draggable={true}
                                        style={{ border: '2px solid ' + TaskColorData.find((e) => e.id == task.categoryId).color }}
                                    >
                                        <div>{task.name}</div>
                                        <div className='pencilIcon'>
                                            <BsPencil onClick={() => chooseTaskToModify(task, true)} onMouseEnter={(event) => event.target.style.cursor = 'pointer'} />
                                        </div>
                                        <div className='trashIcon'>
                                            <BsTrashFill onClick={() => deleteTask(task)} onMouseEnter={(event) => event.target.style.cursor = 'pointer'} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {isFieldVisible[board.id]
                            ?
                            <AddTaskField changeFieldVisibility={changeFieldVisibility} addTaskToBoard={addTaskToBoard} board={board} project={props.project} openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse} />
                            :
                            <Button
                                className="add-button"
                                color="primary"
                                fullWidth
                                startIcon={<AddIcon />}
                                onClick={() => changeFieldVisibility(board.id)}
                            >
                                Add task
                            </Button>
                        }
                    </div>
                )}
            </div>

            <TaskView taskId={getTaskId()} open={isTaskViewOpen} changeOpen={changeIsTaskViewOpen} reloadBoard={refreshTasks} validateFetchResponse={props.validateFetchResponse} />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    board: {
        width: 300,
        height: 510,
        border: '5px solid lightgrey',
        padding: '20px 10px',
        borderRadius: 12,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    projectName: {
        textAlign: "center"
    },
    tasks: {
        overflow: 'auto',
        width: 250,
        
        padding: '20px 10px',
        borderRadius: 12,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    }
}));