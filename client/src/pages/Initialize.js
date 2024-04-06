import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAppAuthenticatedState, setAppInitializedState } from '../redux/actions/appActions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { TOKEN_KEY } from '../constants';
import axios from 'axios';

export default function Initialize() {

    const { isInitialized } = useSelector(state => state.app)
    const dispatch = useDispatch();


    useEffect(() => {

        const token = sessionStorage.getItem(TOKEN_KEY);

        if (!token) {
            dispatch(setAppInitializedState(true))
        } else {

            const url = `http://localhost:5000/`;

            let config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            axios.get(url, config)
                .then(function (response) {
                    dispatch(setAppAuthenticatedState(true))
                })
                .catch(function (error) {
                    dispatch(setAppAuthenticatedState(false))
                }).finally(() => {
                    dispatch(setAppInitializedState(true))
                })

        }

    }, [])


    const [loading, setLoading] = useState(true)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => setLoading(false)}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
