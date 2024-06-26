import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppBar from './AppBar';
import CreateUserTile from './CreateUserTile';
import ViewUsersTile from './ViewUsersTile';
import FullScreenDialog from './FullScreenDialog';
import { useState } from 'react';
import CreateUser from './CreateUser';
import UserTable from './UserTable';


const defaultTheme = createTheme();

export default function UserManagementSection() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
    const [viewUsersDialogOpen, setViewUsersDialogOpen] = useState(false)

    const handleCreateUserClickOpen = () => {
        setCreateUserDialogOpen(true);
    };

    const handleCreateUserClose = () => {
        setCreateUserDialogOpen(false);
    };

    const handleViewUsersClickOpen = () => {
        setViewUsersDialogOpen(true);
    };

    const handleViewUsersClose = () => {
        setViewUsersDialogOpen(false)
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Toolbar />
                    <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{
                        height: '100vh',
                    }}>
                        <Grid item xs={12} md={5} style={{ height: isMediumScreen ? '24vw' : '30vh' }}>
                            <CreateUserTile handleCreateUserClickOpen={handleCreateUserClickOpen} handleCreateUserClose={handleCreateUserClose} />
                        </Grid>
                        <Grid item xs={12} md={5} style={{ height: isMediumScreen ? '24vw' : '30vh' }}>
                            <ViewUsersTile handleViewUsersClickOpen={handleViewUsersClickOpen} handleViewUsersClose={handleViewUsersClose} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <FullScreenDialog
                dialogOpen={createUserDialogOpen}
                handleClickOpen={handleCreateUserClickOpen}
                handleClose={handleCreateUserClose}
                title="Create User"
                contentComponent={<CreateUser action="add" />}
            />

            <FullScreenDialog
                dialogOpen={viewUsersDialogOpen}
                handleClickOpen={handleViewUsersClickOpen}
                handleClose={handleViewUsersClose}
                title="View Users"
                contentComponent={<UserTable />}
            />
        </ThemeProvider>
    )
}
