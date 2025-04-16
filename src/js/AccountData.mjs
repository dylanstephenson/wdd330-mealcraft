// creating AccountData class

class AccountData {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    // Method to get form data
    static getFormData() {
        const firstName = document.getElementById("account_firstname").value;
        const lastName = document.getElementById("account_lastname").value;
        const email = document.getElementById("account_email").value.toLowerCase();
        const password = document.getElementById("account_password").value;

        // Return an instance of the AccountData class
        return new AccountData(firstName, lastName, email, password);
    }

    // Method to convert the object to JSON
    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            recipes: []
        };
    }

    registerUser() {
        // Get existing users or default to an empty array
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email is already used
        const isEmailTaken = existingUsers.some(user => user.email === this.email);
        if (isEmailTaken) {
            throw new Error("An account with this email already exists.");
        }

        // Add this user
        existingUsers.push(this.toJSON());

        // Save back to localStorage
        localStorage.setItem("users", JSON.stringify(existingUsers));
    }
}

// Export the AccountData class so it can be used in other files
export default AccountData;