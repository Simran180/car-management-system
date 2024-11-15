// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    images: [String], // Array of image URLs
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);