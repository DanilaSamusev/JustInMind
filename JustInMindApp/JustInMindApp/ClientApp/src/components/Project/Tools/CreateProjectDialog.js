import { blue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import FetchHelper from '../../../Helpers/FetchHelper';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    projectNameInput: {
        margin: 10,
    },
    submitNewProjectButton: {
        margin: 10,
    },
    buttonsContainer: {
        margin: 10,
        display: 'flex',
        justifyContent: 'space-between',
    }
});

export function CreateProjectDialog(props) {
    const classes = useStyles();

    const [projectName, setProjectName] = React.useState('');

    const handleClose = (value) => {
        props.onClose(value);
    };

    const createProject = async () => {
        let project = JSON.stringify({
            'name': projectName
        })

        let createProjectResponse = await FetchHelper.fetchPost('project', localStorage.token, project);  
        let isCreateProjectResponseValid = await props.validateFetchResponse(createProjectResponse);

        if (isCreateProjectResponseValid) {
            props.openSnackbar(true, 'success', 'Project is created');
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <div>
                <DialogTitle id="simple-dialog-title">Creating new project</DialogTitle>
                <div className={classes.projectNameInput}>
                    <TextField id="outlined-basic" label="Project Name" variant="outlined" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
                </div>
                <div className={classes.buttonsContainer}>
                    <Button variant="contained" size="small" color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" size="small" color="primary" onClick={createProject}>
                        Add
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
