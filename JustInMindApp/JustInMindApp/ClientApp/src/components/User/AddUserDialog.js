import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FetchHelper from '../../Helpers/FetchHelper';

export default function AddUserDialog(props) {
    const { onClose, open } = props;
    const [userEmail, setUserEmail] = React.useState('');

    const handleClose = () => {
        setUserEmail('');
        onClose();
    };

    const inviteColaborator = async () => {
        let body = JSON.stringify({
            'userEmail': userEmail,
            'userRoleId': 0,
            'projectId': localStorage.getItem('projectId'),
        });

        let inviteColaboratorResponse = await FetchHelper.fetchPost('user/addColaborator', localStorage.token, body);
        let isInviteColaboratorResponseValid = await props.validateFetchResponse(inviteColaboratorResponse); 

        if (isInviteColaboratorResponseValid) {
            props.reloadUsers();
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <TextField id="filled-basic" label="User Email" variant="filled" onChange={(event) => setUserEmail(event.target.value)}>
                {userEmail}
            </TextField>
            <Button variant="contained" color="primary" onClick={() => inviteColaborator()}>
                Invite
            </Button>
        </Dialog>
    );
}