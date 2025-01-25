const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    performance: {
        type: Map,
        required: false,
        of: Number,
        default: {},
    },
    score: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Store', storeSchema);