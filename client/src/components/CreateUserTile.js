import React from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';

export default function CreateUserTile() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 20px',
                borderTopLeftRadius: '100px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#2196f3',
                color: 'white',
                width: '100%',
                height: '100%',
                textAlign: 'center',
            }}

        >
            <AddIcon style={{ fill: 'white', width: isMediumScreen ? '110px' : '70px', height: isMediumScreen ? '110px' : '70px' }} />
            <span style={{ marginLeft: '10px', fontSize: isMediumScreen ? '35px' : '20px' }}>Create User</span>
        </div>
    )
}
