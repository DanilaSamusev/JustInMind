import React from 'react';

import Button from '@material-ui/core/Button';
import AddUserDialog from './AddUserDialog';

export default function AddUserTool(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add User
            </Button>

            <AddUserDialog openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse} open={open} onClose={handleClose} reloadUsers={props.reloadUsers} />
        </div>
    );
}
