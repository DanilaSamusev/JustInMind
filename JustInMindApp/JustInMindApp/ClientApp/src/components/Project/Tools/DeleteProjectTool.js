﻿import React from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FetchHelper from '../../../Helpers/FetchHelper';

export function DeleteProjectTool(props) {

    const deleteSelectedProject = async () => {
        let response = await FetchHelper.fetchDelete('project/' + props.project.id, localStorage.token);
        let result = await props.validateFetchResponse(response);

        if (result) {
            props.resetProject();
            props.openSnackbar(true, 'success', 'Project is deleted');
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => deleteSelectedProject()}
            >
                Delete
            </Button>
        </div>
    );
}
