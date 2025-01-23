const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authController = {
    //validation registration
    validateRegister: [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 }),
        check('role', 'Role is required').not().isEmpty()
    ],
    //validation login
    validateLogin: [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 })
    ],

    
    register: async (req, res) => {
        console.log(req.body);
        const { username, email, role, password } = req.body;
        //check if all fields are empty
        if (!username || !email || !role || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        //check user already exists
        const existingUser = await User.fineOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create new user
        const user = new User({
            username,
            email,
            role,
            password: hashedPassword
        });
        //save user
        await user.save();

        return res.status(201).json({
            msg: 'User created successfully'
        });
    },
    login: (req, res) => {
        res.send('Login route');
    },
}
module.exports = authController;