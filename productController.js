// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            images: req.files ? req.files.map(file => file.path) : [], // Handle file uploads safely
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products for the logged-in user
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user.id });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields if provided
        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        product.tags = req.body.tags || product.tags;
        
        // Handle image updates
        if (req.files) {
            product.images = req.files.map(file => file.path);
        }

        await product.save();
        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};