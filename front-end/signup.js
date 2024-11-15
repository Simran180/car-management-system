
document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();  

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem('username', username);

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.status === 201) {
            alert("User created successfully!");
            window.location.href = "login.html"; 
        } else if (response.status === 400) {
            alert(data.message || "User already exists. Please log in.");
        } else {
            alert("An error occurred. Please try again.");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again.");
    }
});
