import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import '../styles/taskView.css';

export function TaskView(props) {
    const classes = useStyles();
    const [taskName, setTaskName] = useState('1111');
    const [taskDescription, setTaskDescription] = useState(null);
    const [taskComment, setTaskComment] = useState(null);

    const [task, setTask] = useState(null);

    const handleClose = () => {
        setTaskName(null);
        setTaskDescription(null);
        setTaskComment(null);
        setTask(null);
        props.changeOpen(false);
    };

    const changeTaskName = (value) => {
        const changedTask = { ...task };
        changedTask.name = value;
        setTask(changedTask);
    };

    const changeTaskDescription = (value) => {
        const changedTask = { ...task };
        changedTask.description = value;
        setTask(changedTask);
    }

    const changeTaskComment = (value) => {
        if (value === null && value === '') {
            return;
        }

        setTaskComment(value);
    }

    const addTaskComment = (value) => {
        const changedTask = { ...task };
        changedTask.comments.push({ taskId: changedTask.id, text: value, userId: localStorage.getItem('userIs') });
        setTask(changedTask);
    }

    const submitTask = () => {
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

    useEffect(() => {

        if (props.taskId == null) {
            return
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('task/' + props.taskId, requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
                else {
                    response
                        .json()
                        .then(json => setTask(json))

                }
            });
    }, [props.taskId]);

    if (task === null) {
        return (
            <div />
        )
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div className={classes.taskView}>
                        <div>
                            <textarea
                                className='taskName'
                                value={task.name}
                                onChange={(e) => changeTaskName(e.target.value)}
                            />
                        </div>
                        <div className='stateLabel'>
                            in {task.state.name} state
					    </div>
                        <div className='ownerContainer'>
                            <div className='ownerLabel'>Owner:</div>
                            <Tooltip title={task.user.name} interactive arrow placement="right-start">
                                <Avatar className={classes.orange} >{task.user.name.substring(0, 1)}</Avatar>
                            </Tooltip>

                        </div>
                        <TextField
                            className={classes.descriptionField}
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            value={taskDescription}
                            onChange={(e) => changeTaskDescription(e.target.value)}
                        />
                        <TextField
                            className={classes.commentField}
                            id="outlined-textarea"
                            label="Add your comment"
                            multiline
                            variant="outlined"
                            onChange={(e) => changeTaskComment(e.target.value)}
                        />
                        <Button className={classes.leaveCommentButton} variant="contained" onClick={() => addTaskComment(taskComment)} >Leave comment</Button>
                        <div className={classes.taskCommentsContainer}>
                            {task.comments.map((comment) => {
                                return <div key={comment.id}>{comment.text}</div>
                            })}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => submitTask()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({

    '.MuiOutlinedInput-multiline': {
        width: '300px',
    },

    commentField: {
        display: 'block',
        marginLeft: '20px',
        marginTop: '7px',

        '& .MuiOutlinedInput-multiline': {
            width: '300px',
        },
    },

    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },

    leaveCommentButton: {
        marginLeft: '20px',
        marginTop: '10px',
    },

    taskView: {
        color: '#172b4d',
        position: 'relative',
        height: '480px',
        width: '400px',
    },

    taskCommentsContainer: {
        overflow: 'auto',
        backgroundColor: '#dfe1e6',
        height: '100px',
        width: '300px',
        marginLeft: '20px',
        marginTop: '10px',
        borderRadius: '3px',
        border: '4px double black;',
    },

    descriptionField: {
        marginLeft: '20px',
        marginTop: '20px',
    },
}));