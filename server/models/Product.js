const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pricebefore: {
        type: Number,
        // required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        required: true
    },  
    subcatagory: {
        type: String,
        // required: true
    },
    brand: {
        type: String,
        // required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store', 
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Product', productSchema);