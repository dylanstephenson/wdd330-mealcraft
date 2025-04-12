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
        const email = document.getElementById("account_email").value;
        const password = document.getElementById("account_password").value;

        // Return an instance of the AccountData class
        return new AccountData(firstName, lastName, email, password);
    }

    // Method to convert the object to JSON
    toJSON() {
        return JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            recipes: [{
                name: "",
                ingredients: [],
                image: "",
                steps: ""
            }
        ]
        });
    }
}

// Export the AccountData class so it can be used in other files
export default AccountData;