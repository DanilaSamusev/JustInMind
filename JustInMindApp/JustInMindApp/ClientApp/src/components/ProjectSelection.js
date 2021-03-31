import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddProject from './AddProject'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    const [projectName, setProjectName] = React.useState('No project selected');
    const [selectedProject, setSelectedProject] = React.useState(null);
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

    const fetchDeleteProject = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('project/' + id, requestOptions)
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

    if (projects == null || collaborationProjects == null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={classes.projectSelectionContainer}>

            <div className={classes.selectedProjectName}>
                <h1>{projectName}</h1>
            </div>

            <div>
                <AddProject reloadProjects={() => {
                    fetchGetUserOwnProjects();
                    fetchGetUserColoborationProjects();
                }} />
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
                                    My projects

                                {projects.map((data, index) => {
                                    return (
                                        <div className={classes.deleteProjectContainer}
                                        >
                                            <MenuItem
                                                onClick={(event) => {
                                                    setProjectName(data.name)
                                                    setSelectedProject(data)
                                                    props.selectProject(Number(event.target.value))
                                                }}
                                                key={index}
                                                value={data.id}>
                                                {data.name}
                                            </MenuItem>
                                            <IconButton component="span" className={classes.deleteProjectButton}>
                                                <DeleteIcon onClick={() => fetchDeleteProject(data.id)}/>
                                            </IconButton>
                                        </div>
                                    );
                                })}

                                My coloborations

                                {collaborationProjects.map((data, index) => {
                                    return (
                                        <div className={classes.deleteProjectContainer}
                                        >
                                            <MenuItem key={index} value={data.id}
                                                onClick={(event) => {
                                                    setProjectName(data.name)
                                                    setSelectedProject(data)
                                                    props.selectProject(data.id)
                                                }}>
                                                {data.name}
                                            </MenuItem>
                                            <IconButton component="span" className={classes.deleteProjectButton}>
                                                <ExitToAppIcon />
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

