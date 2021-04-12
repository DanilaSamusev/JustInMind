import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'userAvatar', label: 'Avatar', minWidth: 170 },
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'userSurname', label: 'Surname', minWidth: 100 },
    { id: 'userEmail', label: 'Email', minWidth: 100 },
    { id: 'userRole', label: 'Role', minWidth: 100 },
    { id: 'action', label: '', minWidth: 100 },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const useStyles = makeStyles({
});

export default function UsersTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        if (rows[0] == null) {
            getUsers();
        }
    })

    const getUsers = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        }

        fetch('user/getAllColaborators/' + Number(localStorage.getItem("projectId")), requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                    this.props.setIsAuthorized(false);
                }
                else {
                    response
                        .json()
                        .then(data => {
                            console.log(data)
                            setRows(data)
                        })
                }
            })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
