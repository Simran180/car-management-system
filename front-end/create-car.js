document.getElementById('createProductForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the values from the form fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    // Ensure all required fields are filled out
    if (!title || !description || !image) {
        alert('Please fill out all fields.');
        return;
    }

    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to create a car. Please log in first.');
        window.location.href = 'login.html';  // Redirect to login page if no token
        return; // Stop the function if there's no token
    }

    // Prepare the form data to be sent
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
   
    try {
        // Send a POST request to the /products endpoint to create a new car
        const response = await fetch('http://localhost:5000/api/products/create', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}` // Using token from localStorage
            },
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            alert('Car created successfully!');
            // Optionally, redirect to the dashboard or car list page
            window.location.href = 'dashboard.html';  // Redirect to the dashboard
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error creating car:', error);
        alert('Failed to create car. Please try again later.');
    }
});
