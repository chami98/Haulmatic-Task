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
    clearenceRecord,
    action,
    handleUpdatedCount,
    place,
}) {
    const [intake, setIntake] = useState(
        action == "edit" ? clearenceRecord.intake : ""
    );
    const [firstName, setFirstname] = useState(
        action == "edit" ? clearenceRecord.firstName : ""
    );
    const [registrationNumber, setRegistrationNumber] = useState(
        action == "edit" ? clearenceRecord.registrationNumber : ""
    );
    const [degree, setDegree] = useState(
        action == "edit" ? clearenceRecord.degree : ""
    );
    const [lastName, setLastName] = useState(
        action == "edit" ? clearenceRecord.clearenceDetails[0].name : ""
    );
    const [itemValue, setItemValue] = useState(
        action == "edit" ? clearenceRecord.clearenceDetails[0].value : ""
    );
    const [itemDescription, setItemDescription] = useState(
        action == "edit" ? clearenceRecord.clearenceDetails[0].description : ""
    );

    const handleIntakeChange = (event) => {
        setIntake(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstname(event.target.value);
    };

    const handleDegreeChange = (event) => {
        setDegree(event.target.value);
    };

    const handleRegistrationNumberChange = (event) => {
        setRegistrationNumber(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleItemValueChange = (event) => {
        setItemValue(event.target.value);
    };
    const handleItemDescriptionChange = (event) => {
        setItemDescription(event.target.value);
    };

    const handleSubmit = () => {
        if (
            !intake ||
            !firstName ||
            !registrationNumber ||
            !degree ||
            !lastName ||
            !itemValue ||
            !itemDescription
        ) {

            return;
        }
        const formData = {
            intake,
            firstName,
            registrationNumber,
            degree,
            clearenceDetails: [
                {

                    name: lastName,
                    value: itemValue,
                    description: itemDescription,
                    place,
                },
            ],
        };

        const httpMethod = action === "edit" ? "put" : "post";

        const url =
            action === "edit"
                ? `https://us-central1-clear-flow-9e0f0.cloudfunctions.net/ClearFlow/data/${clearenceRecord.id}`
                : "https://us-central1-clear-flow-9e0f0.cloudfunctions.net/ClearFlow/data";

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
            {" "}
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
