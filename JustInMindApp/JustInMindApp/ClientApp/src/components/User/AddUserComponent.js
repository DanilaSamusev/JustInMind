import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';

const useStyles = makeStyles({

});

export default function AddUserComponent(props) {
    const classes = useStyles();
    const { onClose, open } = props;
    const [userEmail, setUserEmail] = React.useState('');

    const handleClose = () => {
        setUserEmail('');
        onClose();
    };

    const inviteColaborator = () => {
        fetchInviteColaborator();
    }

    const fetchInviteColaborator = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'userEmail': userEmail,
                'userRoleId': 0,
                'projectId': localStorage.getItem('projectId'),
            })
        }

        fetch('user/addColaborator', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                    props.setIsAuthorized(false);
                }
                else {
                    props.reloadUsers()
                }
            });
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