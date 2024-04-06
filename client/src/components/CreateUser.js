import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Box,
    Button,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import axios from "axios";

export default function CreateUser({
    userRecord,
    action,
    handleUpdatedCount,
    place,
}) {

    const [firstName, setFirstname] = useState(
        action == "edit" ? userRecord.firstName : ""
    );

    const [lastName, setLastName] = useState(
        action == "edit" ? userRecord.lastName : ""
    );

    const handleFirstNameChange = (event) => {
        setFirstname(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleSubmit = () => {
        if (

            !firstName ||
            !lastName

        ) {

            return;
        }
        const formData = {
            firstName,
            lastName,

        };

        const httpMethod = action === "edit" ? "put" : "post";

        const url =
            action === "edit"
                ? `url/${userRecord.id}`
                : "url post";

        axios[httpMethod](url, formData)
            .then((response) => {
                if (httpMethod === "post") {

                } else {
                    handleUpdatedCount();
                }
            })
            .catch((error) => {
                console.error("Error sending data", error);
            });
    };

    return (
        <>
            <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                <Typography variant="h6" component="h6">
                    User Details
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{ padding: "20px" }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="first-name"
                        label="First Name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="last-name"
                        label="Last Name"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2} sx={{ padding: "20px" }}>

                <Grid item xs={12} sm={12}>
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="contained" onClick={handleSubmit} fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
