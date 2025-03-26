document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");
    const adminPanel = document.getElementById("admin-announcements");

    // Check if user is logged in as Admin
    function checkAdminStatus() {
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        if (isAdmin) {
            adminPanel.style.display = "block";
            loginForm.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            adminPanel.style.display = "none";
        }
    }

    // Handle login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            alert("Login Successful as Admin!");
        } else {
            alert("Invalid credentials. Try again.");
        }

        window.location.reload(); // Refresh page to apply changes
    });

    // Handle logout
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("isAdmin");
        window.location.reload();
    });

    checkAdminStatus(); // Check if already logged in
});
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {  // Change as needed
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to your main website
    } else {
        alert("Invalid login. Try again.");
    }
});
document.getElementById("logoutBtn").addEventListener("click", function () {
    alert("Logging out...");
    window.location.href = "index.html"; // Redirect back to login page
});
