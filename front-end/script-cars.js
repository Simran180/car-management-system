
const getCars = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Please log in first');
        window.location.href = 'login.html';  
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/products", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }

        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error("Error:", error);
    }
};

// Display the list of cars on the page
const displayCars = (cars) => {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';  

    if (cars.length === 0) {
        carList.innerHTML = '<p>No cars found</p>';
        return;
    }

    cars.forEach(car => {
        const carItem = document.createElement('div');
        carItem.classList.add('car-item');

        // Display car images
        const images = car.images.map(image => `<img src="http://res.cloudinary.com/your-cloud-name/${image}" alt="${car.title}">`).join('');
        
        carItem.innerHTML = `
            <h3>${car.title}</h3>
            <p>${car.description}</p>
            <p><strong>Tags:</strong> ${car.tags.join(', ')}</p>
            ${images}
        `;

        carList.appendChild(carItem);
    });
};

// Handle the search functionality
const searchCars = () => {
    const query = document.getElementById('search').value.toLowerCase();
    const carItems = document.querySelectorAll('.car-item');

    carItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const tags = item.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query) || tags.includes(query)) {
            item.style.display = 'block';  
        } else {
            item.style.display = 'none'; 
        }
    });
};

// Log out the user by removing the token
const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';  
};

// Fetch cars when the page loads
window.onload = getCars;
