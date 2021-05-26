import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import ValidationHelper from '../../Helpers/ValidationHelper';
import FetchHelper from '../../Helpers/FetchHelper';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright '}
            <Link color="inherit">
                Just In Mind
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const login = async () => {
        if (ValidationHelper.isStringValid(email) || ValidationHelper.isStringValid(password)) {
            props.openSnackbar(true, 'error', 'User Email or Password is empty!')
        }

        let body = JSON.stringify(
            {
                'email': email,
                'password': password
            });

        let loginResponse = await FetchHelper.fetchPost('account/signIn', localStorage.token, body)
        let isLoginResponseValid = await props.validateFetchResponse(loginResponse);

        if (isLoginResponseValid) {
            let identity = await loginResponse.json();

            localStorage.setItem('token', identity.token);
            localStorage.setItem('userName', identity.userName);
            localStorage.setItem('userRole', identity.userRole);
            localStorage.setItem('userId', identity.userId);

            props.setIsAuthorized(true);
            history.push('/');
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="signUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}