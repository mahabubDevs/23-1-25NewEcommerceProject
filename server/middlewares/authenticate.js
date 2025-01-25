const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization.split(' ')[1];
        console.log (token, "token");

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization denied. No token provided.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach decoded user to the request

        next(); // Call the next middleware
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            // Invalid token
            return res.status(401).json({ success: false, message: 'Invalid token. Authorization denied.' });
        } else if (error.name === 'TokenExpiredError') {
            // Expired token
            return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
        } else {
            // Other errors
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
};

module.exports = authenticate;
