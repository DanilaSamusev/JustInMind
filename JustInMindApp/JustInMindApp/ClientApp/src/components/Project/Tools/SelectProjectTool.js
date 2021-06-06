import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

import FetchHelper from '../../../Helpers/FetchHelper';

export default function SelectProjectTool(props) {
    const [ownProjects, setOwnProjects] = React.useState([]);
    const [collaborationProjects, setCollaborationProjects] = React.useState([]);

    useEffect(() => {
        refreshAllProjects()
    }, []);

    const refreshAllProjects = async () => {
        let ownProjectsResponse = await FetchHelper.fetchGet('project/getAllUserOwn', localStorage.token);
        let colaborationProjectsResponse = await FetchHelper.fetchGet('project/getAllUserCollaborate', localStorage.token);

        let isOwnProjecsResponseValid = await props.validateFetchResponse(ownProjectsResponse);
        let isColaborationProjectsResponse = await props.validateFetchResponse(colaborationProjectsResponse);

        if (isOwnProjecsResponseValid && isColaborationProjectsResponse) {
            let ownProjects = await ownProjectsResponse.json();
            let colaborationProjects = await colaborationProjectsResponse.json();
            setOwnProjects(ownProjects);
            setCollaborationProjects(colaborationProjects);
        }
    }

    if (ownProjects == null || collaborationProjects == null) {
        return (
            <div />
        )
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Button variant="contained" color="primary" size="large" {...bindTrigger(popupState)}>
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
                            {ownProjects.map((data, index) => {
                                return (
                                    <div>
                                        <MenuItem onClick={() => props.selectProject(data.id)} >
                                            {data.name}
                                        </MenuItem>
                                    </div>
                                );
                            })}
                            <div>
                                My coloborations
                                    </div>
                            {collaborationProjects.map((project, index) => {
                                return (
                                    <div>
                                        <MenuItem key={index} value={project.id} onClick={() => props.selectProject(project.id)} >
                                            {project.name}
                                        </MenuItem>
                                    </div>
                                );
                            })}
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}

