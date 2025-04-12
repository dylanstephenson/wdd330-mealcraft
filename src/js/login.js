import { loadHeaderFooter } from "./utils.mjs";
import AccountData from "./AccountData.mjs";

// Loads the header footer templates
loadHeaderFooter();

// Add event listener to the registration form
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get form data using the AccountData class
    const user = AccountData.getFormData();

    // Create a JSON object with user data
    const userJSON = user.toJSON();

    // Store the user data in localStorage (use a unique key like 'user_data')
    localStorage.setItem('user_data', userJSON);

    // Optional: Notify the user registration is complete
    alert('Account registered successfully!');
    location.reload();
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get the email and password entered by the user
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    // Retrieve the user data from localStorage
    const storedUserData = localStorage.getItem('user_data');
    
    if (storedUserData) {
        // Parse the stored user data
        const storedUser = JSON.parse(storedUserData);

        // Check if the login credentials match
        if (storedUser.email === loginEmail && storedUser.password === loginPassword) {
            alert('Login successful!');

            // Set the 'isLoggedIn' flag to true
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect to the account page or home page
            window.location.href = "/account/account.html";
        } else {
            alert('Invalid email or password');
        }
    } else {
        alert('No user data found. Please register first.');
    }
});
