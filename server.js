const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
require('dotenv').config();  // Loading environment variables from .env

// Connect to the database
connectDB();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);    // Authentication routes
app.use('/api/products', productRoutes);  // Product-related routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger API docs

const PORT = process.env.PORT || 5000;  // Use the PORT from .env or fallback to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});