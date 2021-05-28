import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, ClickAwayListener } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import FetchHelper from '../../Helpers/FetchHelper';

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

    let addedTask = {};

    const handleChange = (event) => {

        setTaskName(event.target.value);
    };

    const onSubmit = async () => {
        let task = {};

        task.name = taskName;
        task.description = '';
        task.urgencyId = 0;
        task.categoryId = 0;
        task.userId = Number(localStorage.getItem('userId'));
        task.stateId = props.board.id;
        task.projectId = props.project.id;

        let taskJson = JSON.stringify(task)

        let addTaskResponse = await FetchHelper.fetchPost('task', localStorage.token, taskJson);
        let isAddTaskResponseValid = await props.validateFetchResponse(addTaskResponse);

        if (isAddTaskResponseValid) {
            let taskId = await addTaskResponse.json();
            pushToBoard(taskId);
        }
    };

    const pushToBoard = async (taskId) => {
        let getTaskResponse = await FetchHelper.fetchGet('task/' + taskId, localStorage.token);
        let isGetTaskResponseValid = await props.validateFetchResponse(getTaskResponse);

        if (isGetTaskResponseValid) {
            let task = await getTaskResponse.json();
            setAddedTask(task);
        }
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
        addedTask.projectId = props.project.id;

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