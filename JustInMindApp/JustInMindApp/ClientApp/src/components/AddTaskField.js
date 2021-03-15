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
    const [description, setDescription] = useState('');
    const [user, serUser] = useState({
        id: 1,
        name: "Danila",
        password: "1",
        roleId: 1,
    });
    const [state, setState] = useState({
        id: parseInt(props.board.id),
        name: props.board.title,
    });
    const [urgency, setUrgency] = useState({
        id: 0,
        name: "Low"
    });
    const [comments, setComments] = useState([]);
    const [category, setCategory] = useState({
        id: 1,
        name: "Improvement",
    });

    let task = {};

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const onSubmit = () => {
        task.name = name;
        task.description = description;
        task.user = user;
        task.state = state;
        task.urgency = urgency;
        task.comments = comments;
        task.category = category;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        fetch('https://localhost:44330/Task', requestOptions)
            .then(response => response.json())
            .then(taskId => pushToBoard(taskId));
    };

    const pushToBoard = (taskId) => {
        task.id = taskId;
        props.addTaskToBoard(task.state.id, task)
    }

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