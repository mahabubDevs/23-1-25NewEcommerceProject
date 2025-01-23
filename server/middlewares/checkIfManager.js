const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkIfManager = async (req, res, next) => {
//get token from header
    const token = req.header('x-auth-token');
//get token exists
if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
    }
//verify token
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (req.user.role !== 'manager') {
        return res.status(401).json({ message: 'Not authorized' });
        }
        req.user = await User.findById(decoded.id);
//call the next middleware
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = checkIfManager;
