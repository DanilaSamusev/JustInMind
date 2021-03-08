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
    const [name, setName] = useState('');
    const [stateId, setStateId] = useState(parseInt(props.boardId));
    const [userId, setUserId] = useState(1);
    const [description, setDescription] = useState('');
    const [urgencyId, setUrgencyId] = useState(1);
    const [categoryId, setCategoryId] = useState(1);
    const [attachement, setAttachement] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const onSubmit = () => {
        const task = {
            name: name,
            stateId: stateId,
            userId: userId,
            description: description,
            urgencyId: urgencyId,
            categoryId: categoryId,
            attachement: attachement,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        fetch('https://localhost:44330/Task', requestOptions)
            .then(response => response.status)
            .then((r) => console.log(r))
            .then(props.addTaskToBoard(task.stateId, task));
    };

    return (
        <ClickAwayListener onClickAway={() => props.changeFieldVisibility(props.boardId)}>
            <FormControl
                className={classes.root}
                noValidate
                autoComplete="off">

                <TextField
                    autoFocus
                    label="Task name"
                    multiline
                    rowsMax={4}
                    value={name}
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