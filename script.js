// script.js

let products = [];
let currentUser  = null;

document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
 const password = document.getElementById('password').value;
    currentUser  = { username, password }; // Simulate user login
    alert('User  logged in: ' + username);
    window.location.href = 'product-list.html'; // Redirect to product list
});

document.getElementById('createProductForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    const product = {
        id: products.length + 1,
        title,
        description,
        image: URL.createObjectURL(image) // Create a URL for the image
    };
    products.push(product);
    alert('Product created: ' + title);
    window.location.href = 'product-list.html'; // Redirect to product list
});

function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="product-detail.html?id=${product.id}">${product.title}</a>`;
        productList.appendChild(li);
    });
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productTitle').innerText = product.title;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').innerText = product.description;
    }
}

function editProduct() {
    alert('Edit functionality not implemented yet.');
}

function deleteProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    products = products.filter(p => p.id !== productId);
    alert('Product deleted.');
    window.location.href = 'product-list.html'; // Redirect to product list
}

// Load products on product list page
if (document.getElementById('productList')) {
    loadProducts();
}

// Load product details on product detail page
if (document.getElementById('productTitle')) {
    loadProductDetails();
}