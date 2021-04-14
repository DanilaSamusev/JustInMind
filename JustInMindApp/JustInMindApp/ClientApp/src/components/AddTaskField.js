import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, ClickAwayListener } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function AddTaskField(props) {
    const classes = useStyles();
    const [taskName, setTaskName] = useState('');

    let task = {};
    let addedTask = {};

    const handleChange = (event) => {

        setTaskName(event.target.value);
    };

    const onSubmit = () => {
        task.name = taskName;
        task.description = '';
        task.urgencyId = 0;
        task.categoryId = 0;
        task.userId = Number(localStorage.getItem('userId'));
        task.stateId = props.board.id;
        task.projectId = props.projectId;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(task)
        }

        fetch('Task', requestOptions)
            .then(response => response.json())
            .then(taskId => pushToBoard(taskId));
    };

    const pushToBoard = (taskId) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        };

        fetch('Task/' + taskId, requestOptions)
            .then(response => response.json())
            .then(data => setAddedTask(data));
    }

    const setAddedTask = (data) => {
        addedTask.id = data.id;
        addedTask.name = data.name;
        addedTask.description = data.description;
        addedTask.urgencyId = data.urgencyId;
        addedTask.categoryId = data.categoryId;
        addedTask.userId = data.userId;
        addedTask.stateId = data.stateId;
        addedTask.user = data.user;

        props.addTaskToBoard(addedTask.stateId, addedTask);
    };

    return (
        <ClickAwayListener onClickAway={() => props.changeFieldVisibility(props.board.id)}>
            <FormControl
                className={classes.root}
                noValidate
                autoComplete="off">
                <TextField
                    autoFocus
                    label="Task name"
                    multiline
                    rowsMax={4}
                    value={taskName}
                    onChange={handleChange}
                    size="small"
                />
                <Button
                    onClick={onSubmit}
                    color="primary"
                    variant="contained">
                    Add
                </Button>
            </FormControl>
        </ClickAwayListener>
    );
}