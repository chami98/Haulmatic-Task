const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const app = express();


// Initialize Firebase Admin SDK
const serviceAccount = require('./config/serviceAccountKey.json');
const authenticate = require('./middlewares/authenticationMiddleware');
const constants = require('./constants');

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
            return res.status(404).json({ error: 'User not found' });
        }

        // There should be only one document since username should be unique
        const userDoc = userSnapshot.docs[0].data();

        // Compare the provided password with the hashed password stored in Firestore
        const passwordMatch = await bcrypt.compare(password, userDoc.password);

        if (passwordMatch) {
            // Passwords match, generate JWT token
            const token = jwt.sign({ username: userDoc.username, userId: userDoc.userId }, constants.JWT_SECRET, { expiresIn: '1h' });

            // Return token
            return res.status(200).json({ username, token });
        } else {
            // Passwords don't match
            return res.status(401).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(authenticate)



app.get('/', (req, res) => {
    return res.status(200).json({ user: req.user })
})

// POST endpoint to create users
app.post('/users', async (req, res) => {
    // Retrieve firstName and lastName from the request body
    const { firstName, lastName } = req.body;

    try {
        // Generate a unique user ID
        const userId = db.collection('users').doc().id;

        // Create a new users document
        await db.collection('users').doc(userId).set({
            firstName,
            lastName,
            userId
        });

        // Return success response
        return res.status(201).json({ message: 'User details created successfully', userId });
    } catch (error) {
        console.error('Error creating user details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        // Query Firestore to fetch all user documents
        const usersSnapshot = await db.collection('users').get();

        // Extract user data from the snapshot
        const users = [];
        usersSnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        // Return the user data
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET endpoint to fetch details of a single user
app.get('/users/:userId', async (req, res) => {
    // Retrieve userId from request parameters
    const { userId } = req.params;

    try {
        // Query Firestore to fetch the user document by userId
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data
        return res.status(200).json(userDoc.data());
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT endpoint to edit user details
app.put('/users/:userId', async (req, res) => {
    // Retrieve userId from request parameters
    const { userId } = req.params;

    // Retrieve updated firstName and lastName from the request body
    const { firstName, lastName } = req.body;

    try {
        // Check if the user exists
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user details
        await userRef.update({
            firstName,
            lastName
        });

        // Return success response
        return res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE endpoint to delete a user
app.delete('/users/:userId', async (req, res) => {
    // Retrieve userId from request parameters
    const { userId } = req.params;

    try {
        // Check if the user exists
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user document
        await userRef.delete();

        // Return success response
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;