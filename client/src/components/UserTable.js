import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FullScreenDialog from './FullScreenDialog';
import CreateUser from './CreateUser';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { BASE_URL, TOKEN_KEY } from '../constants';


function Row(props) {
    const { row, handleEdit, handleDelete } = props;
    const [open, setOpen] = useState(false);
    const [userRecord, setUserRecord] = useState([]);
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);

    const handleEditClearenceClickOpen = () => {
        setEditUserDialogOpen(true);
    };

    const handleEditClearenceClose = () => {
        setEditUserDialogOpen(false);
    };

    const handleEditClick = async () => {
        handleEdit(row);
        await setUserRecord(row);
        handleEditClearenceClickOpen();
    };

    const handleDeleteClick = () => {
        handleDelete(row);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="right">
                    {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">
                    <IconButton color="primary" onClick={handleEditClick}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <FullScreenDialog
                dialogOpen={editUserDialogOpen}
                handleClickOpen={handleEditClearenceClickOpen}
                handleClose={handleEditClearenceClose}
                title="Edit User Record"
                contentComponent={<CreateUser userRecord={userRecord} action="edit" handleUpdatedCount={props.handleUpdatedCount} />}
            />
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

function UserTable({ }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatedCount, setUpdatedCount] = useState(0);

    const handleUpdatedCount = () => {
        setUpdatedCount(updatedCount + 1)
    }

    useEffect(() => {
        const url = BASE_URL + `/users`;

        const token = sessionStorage.getItem(TOKEN_KEY)
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        axios.get(url, config)
            .then(function (response) {
                setRows(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
            });
    }, [updatedCount]);


    const handleEdit = (editedRow) => {
        const updatedRows = rows.map(row => {
            if (row.firstName === editedRow.firstName) {
                return editedRow;
            }
            return row;
        });
        setRows(updatedRows);
    };

    const handleDelete = (rowToDelete) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete record of ${rowToDelete.firstName}?`);
        if (isConfirmed) {

            const token = sessionStorage.getItem(TOKEN_KEY)

            const headers = {
                Authorization: `Bearer ${token}`
            };

            axios.delete(`${BASE_URL}/users/${rowToDelete.userId}`, { headers })
                .then(response => {
                    const updatedRows = rows.filter(row => row.userId !== rowToDelete.userId);
                    setRows(updatedRows);
                })
                .catch(error => {
                    console.error('Error deleting row:', error);
                });
        }
    };

    if (loading) {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Skeleton variant="rounded" height={50} animation="wave" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.firstName} row={row} handleEdit={handleEdit} handleDelete={handleDelete} handleUpdatedCount={handleUpdatedCount} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;
