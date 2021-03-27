import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function ProjectSelection(props) {
    const classes = useStyles();
    const [projects, setProjects] = React.useState(null);

    const handleChange = (event) => {
        props.selectProject(Number(event.target.value));
    };

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('project/getAll', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                }
                else {
                    response
                        .json()
                        .then(json => setProjects(json))

                }
            });
    }, [projects]);

    if (projects == null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select
                    onChange={handleChange}
                    className={classes.selectEmpty}
                >
                    {projects.map((data, index) => {
                        return (
                            <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
                        );
                    })} 
                </Select>
                <FormHelperText>Project</FormHelperText>
            </FormControl>

        </div>
    );
}

