const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    console.log('Connected to Database')
})
    .catch(err => console.log(err));


//define routes
const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/manager');
const productRoutes = require('./routes/product');

//use routes
app.use('/api/auth', authRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/product', productRoutes);

//export app
module.exports = app;