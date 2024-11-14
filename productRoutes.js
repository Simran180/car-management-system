// routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure storage as needed
const router = express.Router();

router.post('/', authenticate, upload.array('images', 10), createProduct);
router.get('/', authenticate, getProducts);
router.get('/:id', authenticate, getProductById);
router.put('/:id', authenticate, upload.array('images', 10), updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;