import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAppInitializedState } from '../redux/actions/appActions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function Initialize() {

    const { isInitialized } = useSelector(state => state.app)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setAppInitializedState(true))
        console.log("dispatching")
    }, [])


    console.log(isInitialized)

    const [loading, setLoading] = useState(true)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => setLoading(false)}
        >
            <CircularProgress color="inherit" />
            <Typography variant="h6" color="inherit" component="div" sx={{ ml: 2 }}>
                Signing in...
            </Typography>
        </Backdrop>
    )
}
