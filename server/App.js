const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');

const app = express();
const port = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./config/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to handle login
app.post('/signin', async (req, res) => {
    // Retrieve username and password from the request body
    const { username, password } = req.body;

    try {
        // Query Firestore to find user document by username
        const userSnapshot = await db.collection('users').where('username', '==', username).get();

        if (userSnapshot.empty) {
            // No user found with the provided username
            return res.status(404).send('User not found');
        }

        // There should be only one document since username should be unique
        const userDoc = userSnapshot.docs[0].data();

        // Compare the provided password with the hashed password stored in Firestore
        const passwordMatch = await bcrypt.compare(password, userDoc.password);

        if (passwordMatch) {
            // Passwords match, login successful
            return res.send('Login successful');
        } else {
            // Passwords don't match
            return res.status(401).send('Incorrect password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
