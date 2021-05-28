import React from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { CreateProjectDialog } from './CreateProjectDialog';

export default function CreateProjectTool(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                New
            </Button>

            <CreateProjectDialog open={open} onClose={handleClose} validateFetchResponse={props.validateFetchResponse} openSnackbar={props.openSnackbar}/>
        </div>
    );
}