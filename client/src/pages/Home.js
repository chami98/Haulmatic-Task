import React from 'react'
import AppBar from '../components/AppBar'
import CreateUserTile from '../components/CreateUserTile'
import ViewUsersTile from '../components/ViewUsersTile'

export default function Home() {
    return (
        <>
            <AppBar />

            <CreateUserTile />

            <ViewUsersTile />
        </>
    )
}
