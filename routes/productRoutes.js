
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
cars = []; // In-memory array to store car details
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define where to store the uploaded files
    cb(null, 'uploads/'); // 'uploads' folder will be created in your project root
  },
  filename: function (req, file, cb) {
    // Define how the uploaded file will be named
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid overwriting
  }
});

// Create the multer upload middleware
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
}).single('image'); // 'image' should match the name in the frontend form input

// Route to create a car (product) and upload an image
router.post('/create', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Assuming you're getting the other product details (like title and description) from req.body
  const { title, description } = req.body;

  // Here, you can save the car details and the image path to the database (if needed)
  const carDetails = {
    title,
    description,
    imagePath: req.file.path, // Save the uploaded image path
  };

  // Respond with a success message and car details
  res.status(201).json({
    message: 'Car created successfully!',
    carDetails
  });
});

 // Assuming you're getting the other product details (like title and description) from req.body
 const { title, description } = req.body;

 const carDetails = {
   id: Date.now(),  // Using timestamp as unique ID
   title,
   description,
   imagePath: req.file.path, // Save the uploaded image path
 };

 // Add the new car to the in-memory cars array (replace with DB logic if necessary)
 cars.push(carDetails);

 // Respond with a success message and car details
 res.status(201).json({
   message: 'Car created successfully!',
   carDetails
 });

// Route to get the list of cars
router.get('/', (req, res) => {
 try {
   // Return the list of all cars
   res.status(200).json(cars);
 } catch (error) {
   console.error('Error fetching cars:', error);
   res.status(500).json({ message: 'Failed to fetch cars' });
 }
});

// Route to get details of a specific car by its ID
router.get('/:id', (req, res) => {
 const { id } = req.params;

 // Find the car with the given ID
 const car = cars.find((car) => car.id == id);

 if (!car) {
   return res.status(404).json({ message: 'Car not found' });
 }

 // Return the car details
 res.status(200).json(car);
});

// Route to update a car's details
router.put('/:id', upload, (req, res) => {
 const { id } = req.params;
 const { title, description } = req.body;

 // Find the car to update
 let car = cars.find((car) => car.id == id);

 if (!car) {
   return res.status(404).json({ message: 'Car not found' });
 }

 // Update the car details
 if (title) car.title = title;
 if (description) car.description = description;

 // If a new image is uploaded, update the image path
 if (req.file) {
   car.imagePath = req.file.path;
 }

 // Respond with the updated car details
 res.status(200).json({
   message: 'Car updated successfully',
   car
 });
});

module.exports = router;
