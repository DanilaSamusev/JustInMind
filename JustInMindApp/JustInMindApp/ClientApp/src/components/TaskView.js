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
    const [taskName, setTaskName] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);
    const [taskComment, setTaskComment] = useState(null);

    const handleClose = () => {
        setTaskName(null);
        setTaskDescription(null);
        setTaskComment(null);

        props.changeOpen(false);
    };

    if (props.task === null) {
        return (
            <div />
        )
    }
    else {
        if (taskName === null) {
            setTaskName(props.task.name);
        }

        if (taskDescription === null) {
            setTaskDescription(props.task.description);
        }
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div className={classes.taskView}>
                        <div>
                            <textarea
                                className='taskName'
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>
                        <div className='stateLabel'>
                            in {props.task.state.name} state
					</div>
                        <div className='ownerContainer'>
                            <div className='ownerLabel'>Owner:</div>
                            <Tooltip title={props.task.user.name} interactive arrow placement="right-start">
                                <Avatar className={classes.orange} >{props.task.user.name.substring(0, 1)}</Avatar>
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
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <TextField
                            className={classes.commentField}
                            id="outlined-textarea"
                            label="Add your comment"
                            placeholder="Placeholder"
                            multiline
                            variant="outlined"
                            onChange={(e) => setTaskComment(e.target.value)}
                        />
                        <Button className={classes.leaveCommentButton} variant="contained" onClick={() => props.changeTaskComments(taskComment)} >Leave comment</Button>
                        <div className={classes.taskCommentsContainer}>
                            {props.task.comments.map((comment) => {
                                return <div key={comment.id}>{comment.text}</div>
                            })}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.changeTaskData(taskName, taskDescription)} color="primary">
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