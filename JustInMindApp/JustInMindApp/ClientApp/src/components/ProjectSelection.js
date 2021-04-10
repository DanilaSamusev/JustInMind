import React, { useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';

import AddProject from './AddProject';

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
    deleteProjectContainer: {
        display: 'flex',
    },
    deleteProjectButton: {
        marginLeft: 'auto'
    },
    selectedProjectName: {
        margin: '0 auto',
        alignSelf: 'center'
    },
    projectSelectionPopover: {

        alignSelf: 'center'
    },
}));

export default function ProjectSelection(props) {
    const classes = useStyles();
    const [projects, setProjects] = React.useState([]);
    const [collaborationProjects, setCollaborationProjects] = React.useState([]);

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
                    props.setIsAuthorized(false);
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

    const fetchDeleteProject = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('project/deleteProject/' + id, requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');

                    this.setState({
                        isAuthorized: false,
                    });
                }
                else {
                    fetchGetUserOwnProjects();
                    fetchGetUserColoborationProjects();
                }
            });
    }

    const fetchLeaveProject = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('project/leaveProject/' + id, requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');

                    this.setState({
                        isAuthorized: false,
                    });
                }
                else {
                    fetchGetUserOwnProjects();
                    fetchGetUserColoborationProjects();
                }
            });
    }

    const reloadAllProjects = () => {
        fetchGetUserOwnProjects();
        fetchGetUserColoborationProjects();
    }

    return (
        <div className={classes.projectSelectionContainer}>

            <div>
                <AddProject reloadProjects={reloadAllProjects} />
            </div>

            <div className={classes.projectSelectionPopover}>
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                Select project
                            </Button>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Box p={2}>
                                    <div>
                                        My projects
                                    </div>

                                    {projects.map((data, index) => {
                                        return (
                                            <div className={classes.deleteProjectContainer}
                                            >
                                                <MenuItem
                                                    onClick={() => props.selectProject(data.id)}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                                <IconButton component="span" className={classes.deleteProjectButton}>
                                                    <DeleteIcon onClick={() => fetchDeleteProject(data.id)} />
                                                </IconButton>
                                            </div>
                                        );
                                    })}

                                    <div>
                                        My coloborations
                                    </div>

                                    {collaborationProjects.map((data, index) => {
                                        return (
                                            <div className={classes.deleteProjectContainer}
                                            >
                                                <MenuItem key={index} value={data.id}
                                                    onClick={() => props.selectProject(data.id)}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                                <IconButton component="span" className={classes.deleteProjectButton}>
                                                    <ExitToAppIcon onClick={() => fetchLeaveProject(data.id)} />
                                                </IconButton>
                                            </div>

                                        );
                                    })}
                                </Box>
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>
        </div>
    );
}

