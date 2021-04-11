import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deepOrange } from '@material-ui/core/colors';

export function SignOut(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getUserNameFirstLetter = () => {
        if (localStorage.getItem('userName') != null) {
            return localStorage.getItem('userName').substring(0, 1);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('projectId');
        props.setIsAuthorized(false);
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
                    SignOut <ExitToAppIcon className={classes.logoutButton}/>
                </MenuItem>
            </Menu>
            <Avatar
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.avatar}>{getUserNameFirstLetter()}
            </Avatar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        right: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    logoutButton: {
        marginLeft: '5px',
        color: '#1976d2',
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: deepOrange[500],
    },
}));
