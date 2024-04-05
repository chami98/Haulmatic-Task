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


const defaultTheme = createTheme();

export default function UserManagementSection() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

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
                            <CreateUserTile />
                        </Grid>
                        <Grid item xs={12} md={5} style={{ height: isMediumScreen ? '24vw' : '30vh' }}>
                            <ViewUsersTile />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
