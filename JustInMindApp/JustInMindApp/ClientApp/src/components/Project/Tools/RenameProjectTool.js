import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

import FetchHelper from '../../../Helpers/FetchHelper';

export function RenameProjectTool(props) {
    const [changedProjectName, setChangedProjectName] = useState(null);
    const [isNameChanged, setIsNameChanged] = useState(false);

    const changeProjectName = (projectName) => {
        setIsNameChanged(true);
        setChangedProjectName(projectName);
    }

    const putProject = async () => {
        let project = props.project;
        project.name = changedProjectName;

        let renameProjectResponse = await FetchHelper.fetchPut('project', localStorage.token, JSON.stringify(project));
        let isRenameProjectResponseValid = await props.validateFetchResponse(renameProjectResponse);

        if (isRenameProjectResponseValid) {
            setIsNameChanged(false);
        }
    }

    let saveButton = <div />

    if (props.project == null) {
        return (<div />)
    }

    if (isNameChanged) {
        saveButton =
            <IconButton color="primary" aria-label="save changes" component="span" onClick={() => putProject()}>
                <SaveIcon />
            </IconButton>
    }

    return (
        <div>
            <TextField id="filled-basic" variant="outlined" defaultValue={props.project.name} onChange={(event) => changeProjectName(event.target.value)} />
            {saveButton}
        </div>
    );
}