const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashSync } = require('bcrypt');


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
        const existingUser = await User.findOne({ email });
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
    login: async (req, res) => {
        const { email, password } = req.body;
        //check if all fields are empty
        if (!email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        //check user exists
        try {
                const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ msg: 'User does not exist' });
            }   
            //check password
            const validPassword = await bcrypt.compare(password, existingUser.password);
            if (!validPassword) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            //create token
            const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                token,
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role,
                    created_at: existingUser.created_at
                }
            });
        } catch (error) {
            //handel error
            return res.status(500).json({ msg: error.message });
        }
    },
}
module.exports = authController;