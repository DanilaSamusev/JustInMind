import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, ClickAwayListener } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    addProjectButton: {
        margin: theme.spacing(2.8),
    }
}));

export default function AddProject(props) {
    const classes = useStyles();
    const [isClicked, setIsClicked] = useState(false);
    const [projectName, setProjectName] = useState('');
    
    const handleAddProjectButtonClick = () => {
        setIsClicked(false);
        fetchAddNewProject();
    }

    const fetchAddNewProject = () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'name': projectName
            })
        }

        fetch('project', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
                else {
                    props.reloadProjects();
                }
        });
    }

    if (!isClicked) {
        return (
            <Tooltip title='Create project'>
                <IconButton component="span" className={classes.addProjectButton} onClick={() => setIsClicked(true)}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        )
    }

    return (

        <ClickAwayListener onClickAway={() => setIsClicked(false)}>
            <FormControl 
                className={classes.root}
                noValidate
                autoComplete="off">

                <TextField
                    autoFocus
                    label="Project name"
                    multiline
                    rowsMax={4}
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    size="small"
                />
                <Button
                    onClick={() => handleAddProjectButtonClick()}
                    color="primary"
                    variant="contained">
                    Add
                </Button>
            </FormControl>
        </ClickAwayListener>
    );
}