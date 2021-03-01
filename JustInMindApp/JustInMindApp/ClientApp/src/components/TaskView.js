import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import { deepOrange, deepPurple, red } from '@material-ui/core/colors';

import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { LoadingPage } from './LoadingPage';

import '../styles/taskView.css';

export function TaskView(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.changeOpen(false);
    };

    if (props.task === null) {     
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
                            <textarea className='taskName'>{props.task.name}</textarea>
                        </div>

                        <div className='stateLabel'>
                            in {'New'} state
					</div>
                        <div className='ownerContainer'>
                            <div className='ownerLabel'>Owner:</div>
                            <Avatar className={classes.orange}>OP</Avatar>
                        </div>
                        <TextField
                            className={classes.descriptionField}
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            rowsMax={4}
                            value={'Explain this ticket more infromative'}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.commentField}
                            id="outlined-textarea"
                            label="Add your comment"
                            placeholder="Placeholder"
                            multiline
                            variant="outlined"
                        />
                        <div className={classes.taskCommentsContainer}>
                            <div>Test comment!!!</div>
                            <div>Test comment!!!</div>
                            <div>Test comment!!!</div>
                            <div>Test comment!!!</div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
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
            height: '20px',
        },
    },

    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },

    taskView: {
        color: '#172b4d',
        position: 'relative',
        height: '420px',
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