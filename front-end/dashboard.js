
const token = localStorage.getItem('token');
const userId = localStorage.getItem('username'); 

if (!token || !userId) {
    console.log("User not logged in");
    window.location.href = 'login.html'; 
}


function loadUserProfile() {
    const username = document.getElementById('username');
    username.textContent = userId || 'Guest'; // Use the username or fallback to 'Guest'
}

// Function to fetch the user's cars
async function fetchUserCars() {
    try {
        // Get the user's cars from the API
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the request
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }

        const cars = await response.json();
        displayCarList(cars); // Display the fetched cars
    } catch (error) {
        console.error('Error fetching cars:', error);
        const carListContainer = document.getElementById('car-list');
        carListContainer.innerHTML = '<p>Error loading cars. Please try again later.</p>';
    }
}

// Function to display the list of cars on the dashboard
function displayCarList(carsToDisplay) {
    const carListContainer = document.getElementById('car-list');
    carListContainer.innerHTML = ''; // Clear any existing car list

    if (carsToDisplay.length === 0) {
        carListContainer.innerHTML = '<p>No cars found.</p>';
        return;
    }

    carsToDisplay.forEach(car => {
        const carItem = document.createElement('div');
        carItem.classList.add('car-item');
        carItem.innerHTML = `
            <div class="car-name">${car.title}</div>
            <div class="car-id">ID: ${car.id}</div>
            <div class="car-description">${car.description}</div>
            <button class="view-car-btn" onclick="viewCarDetails('${car.id}')">View Details</button>
            <button class="update-car-btn" onclick="updateCar('${car.id}')">Update Car</button>
            <button class="delete-car-btn" onclick="deleteCar('${car.id}')">Delete Car</button>
        `;
        carListContainer.appendChild(carItem);
    });
}

// Function to search cars by title or description
async function searchCars(query) {
    try {
        const response = await fetch(`http://localhost:5000/api/products?search=${query}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to search cars');
        }

        const cars = await response.json();
        displayCarList(cars);
    } catch (error) {
        console.error('Error searching cars:', error);
        const carListContainer = document.getElementById('car-list');
        carListContainer.innerHTML = '<p>Error searching cars. Please try again later.</p>';
    }
}

// Function to view car details by ID
async function viewCarDetails(carId) {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${carId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch car details');
        }

        const car = await response.json();
        alert(`Car Details:\nTitle: ${car.title}\nDescription: ${car.description}`);
    } catch (error) {
        console.error('Error fetching car details:', error);
        alert('Error fetching car details. Please try again later.');
    }
}

// Function to update car details
async function updateCar(carId) {
    const updatedData = {
        description: 'Updated car description', // This can be customized as per your requirements
        tags: ['tag1', 'tag2'],  // Assuming tags are updated too
    };

    try {
        const response = await fetch(`http://localhost:5000/api/products/${carId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update car');
        }

        const updatedCar = await response.json();
        console.log('Car updated successfully:', updatedCar);
        alert('Car updated successfully!');
        fetchUserCars(); // Refresh the car list after updating
    } catch (error) {
        console.error('Error updating car:', error);
        alert('Error updating car. Please try again later.');
    }
}

// Function to delete a car
async function deleteCar(carId) {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${carId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete car');
        }

        console.log('Car deleted successfully');
        alert('Car deleted successfully!');
        fetchUserCars(); // Refresh the car list after deletion
    } catch (error) {
        console.error('Error deleting car:', error);
        alert('Error deleting car. Please try again later.');
    }
}

// Event listener for the search button
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    searchCars(searchInput.value);
});

// Initialize the dashboard when the page loads
window.onload = function() {
    loadUserProfile(); 
    fetchUserCars();   
};