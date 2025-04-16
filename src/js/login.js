import { loadHeaderFooter } from "./utils.mjs";
import AccountData from "./AccountData.mjs";

// Loads the header footer templates
loadHeaderFooter();

const params = new URLSearchParams(window.location.search);
if (params.get("redirected")) {
  document.getElementById("login-message").textContent = "♦️ Please log in to access that page";
}

// Add event listener to the registration form
document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get form data using the AccountData class
    const user = AccountData.getFormData();

    try {
        user.registerUser();
        alert("✅ Registration successful!");
        window.location.href = "/login/login.html";
    } catch (err) {
        alert(`❗ ${err.message}`);
    }
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const loginEmail = document.getElementById("login-email").value.toLowerCase();
    const loginPassword = document.getElementById("login-password").value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find a user with matching email and password
    const matchedUser = storedUsers.find(user => 
        user.email === loginEmail && user.password === loginPassword
    );

    if (matchedUser) {
        alert('Login successful!');

        // Save session info (you could store more here if needed)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));

        window.location.href = "/account/account.html";
    } else {
        alert('Invalid email or password');
    }
});
