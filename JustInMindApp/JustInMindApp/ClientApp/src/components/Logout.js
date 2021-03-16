import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export function Logout(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.setItem('token', null);
        props.logout();
    }

    return (
        <div className={classes.root}>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>{"User: " + localStorage.getItem('userName')}</MenuItem>
                <MenuItem>{"Role: " + localStorage.getItem('userRole')}</MenuItem>
                <MenuItem onClick={logout}>
                    Logout <ExitToAppIcon className={classes.logoutButton}/>
                </MenuItem>
            </Menu>

            <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.avatar}>{localStorage.getItem('userName').substring(0, 1)}</Avatar>

        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '240px',
        marginTop: '5px',
    },

    logoutButton: {
        marginLeft: '5px',
        color: '#1976d2',
    },

    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },

}));
