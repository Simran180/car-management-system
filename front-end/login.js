
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem('username', username);

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.status === 200) {
            alert("Login successful!");
            localStorage.setItem("token", data.token); // Save the JWT token to localStorage
            window.location.href = "dashboard.html"; // Redirect to a dashboard or product list page
        } else {
            alert(data.message || "Invalid credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    }
});
