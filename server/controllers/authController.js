const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const Store = require('../models/Store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { hashSync } = require('bcrypt');


const authController = {
    //validation registration
    
     validateRegister : [
        check('username').notEmpty().withMessage('Username is required'),
        check('email').isEmail().withMessage('Valid email is required'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        check('role').notEmpty().withMessage('Role is required')
    ],
    
    //validation login
    validateLogin: [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 })
    ],


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
    
    // register: async (req, res) => {
    //     console.log(req.body);
    //     const { username, email, role, password,storeName,description,logo } = req.body;
    //     //check if all fields are empty
    //     if (!username || !email || !role || !password) {
    //         return res.status(400).json({ msg: 'All fields are required' });
    //     }
       
    //     //check user already exists
    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
    //         return res.status(400).json({ msg: 'User already exists' });
    //     }

    //     //hash the password
    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     if(role === 'seller' ){
    //         if (!storeName) {
    //             return res.status(400).json({ msg: 'Store name is required' });
    //         }
    //         if (!description) {
    //             return res.status(400).json({ msg: 'Description is required' });
    //         }
    //         if (!logo) {
    //             return res.status(400).json({ msg: 'Logo is required' });
    //         }
    //         const user = new User({
    //             username,
    //             email,
    //             role,
    //             password: hashedPassword
    //         });
    //         //save user
    //         await user.save();
            
    //         const store = new Store({
    //             storeName: storeName,
    //             logo: '',
    //             description: description,
    //             seller: user._id
    //         });
    //         await store.save();
    //         return res.status(201).json({
    //             msg: 'User created successfully'
    //         });
    //     }
    //     //create new user
    //     const user = new User({
    //         username,
    //         email,
    //         role,
    //         password: hashedPassword
    //     });
    //     //save user
    //     await user.save();
        
    //     const store = new Store({
    //         storeName: storeName,
    //         logo: '',
    //         description: description,
    //         seller: user._id
    //     });
    //     await store.save();
    //     return res.status(201).json({
    //         msg: 'User created successfully'
    //     });
    // },

     register : async (req, res) => {
        try {
            console.log(req.body);
            const { username, email, role, password, storeName, description, logo } = req.body;
    
            // Check if all fields are filled
            if (!username || !email || !role || !password) {
                return res.status(400).json({ msg: 'Username, email, role, and password are required' });
            }
    
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ msg: 'User already exists with this email' });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create new user
            const user = new User({
                username,
                email,
                role,
                password: hashedPassword
            });
    
            // Save user to the database
            await user.save();
    
            // If role is 'seller', create a store
            if (role === 'seller') {
                if (!storeName || !description || !logo) {
                    return res.status(400).json({ msg: 'Store name, description, and logo are required for sellers' });
                }
    
                const store = new Store({
                    storeName,
                    logo,
                    description,
                    seller: user._id
                });
    
                await store.save();
            }
    
            return res.status(201).json({ msg: 'User created successfully' });
    
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    
}
module.exports = authController;