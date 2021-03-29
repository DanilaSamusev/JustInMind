import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddProject from './AddProject'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    projectSelectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minHeight: '100px',
    },
    
}));

export default function ProjectSelection(props) {
    const classes = useStyles();
    const [projectId, setProjectId] = React.useState(null);
    const [projects, setProjects] = React.useState(null);
    const [collaborationProjects, setCollaborationProjects] = React.useState(null);

    useEffect(() => {
        fetchGetUserOwnProjects();
        fetchGetUserColoborationProjects();
    }, []);

    const fetchGetUserOwnProjects = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('project/getAllUserOwn', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
                else {
                    response
                        .json()
                        .then(json => setProjects(json))

                }
            });
    }

    const fetchGetUserColoborationProjects = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('project/getAllUserCollaborate', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
                else {
                    response
                        .json()
                        .then(json => setCollaborationProjects(json))

                }
            });
    }

    if (projects == null || collaborationProjects == null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={classes.projectSelectionContainer}>

            <AddProject reloadProjects={() => {
                fetchGetUserOwnProjects();
                fetchGetUserColoborationProjects();
            }}/>

            <FormControl className={classes.formControl}>
                <Select
                    value={projectId}
                    onChange={(event) => {
                        //Do it to fix the bug when ListSubheader element is selected. It is clickable. I don't know how to fix that for now
                        if (isNaN(Number(event.target.value))) {                           
                            return
                        }
                        setProjectId(Number(event.target.value))
                        props.selectProject(Number(event.target.value))
                    }}
                    className={classes.selectEmpty}
                >
                    <ListSubheader>My Projects</ListSubheader>
                    {projects.map((data, index) => {
                        return (
                            <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
                        );
                    })} 

                    <ListSubheader>My Collaborations</ListSubheader>

                    {collaborationProjects.map((data, index) => {
                        return (
                            <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
                        );
                    })}
                </Select>
                <FormHelperText>Projects</FormHelperText>
            </FormControl>
        </div>
    );
}

