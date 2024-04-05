const jwt = require('jsonwebtoken');
const constants = require('../constants');


const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'jhjhjh kjkjnkjnk'

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify token
    jwt.verify(token, constants.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // If token is valid, attach the decoded payload to the request object
        req.user = decoded;
        next();
    });
}


module.exports = authenticate;