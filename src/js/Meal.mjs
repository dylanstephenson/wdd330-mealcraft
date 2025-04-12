// Class for building meal

class Meal {
    constructor() {
        this.ingredients = [];
        this.name = "";
    }

    init() {
        this.setupMealNameInput();
        this.getIngredients();
    }

    // Handle the meal name input and transition
    setupMealNameInput() {
        const mealNameForm = document.getElementById("meal-name-form");
        
        mealNameForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const mealNameInput = document.getElementById("meal-name");
            this.name = mealNameInput.value;

            // Hide the meal name form and show the ingredient form
            document.getElementById("meal-name-container").style.display = "none";
            document.getElementById("ingredient-container").style.display = "block";

            // Set the meal name on the ingredient card
            document.getElementById("meal-card-name").textContent = this.name;
        });
    }

    // Handle adding ingredients
    getIngredients() {
        const ingredientForm = document.getElementById("ingredient-form");

        ingredientForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const ingredientName = document.getElementById("ingredient-name").value;
            const ingredientQuantity = document.getElementById("ingredient-quantity").value;

            // Add ingredient to the ingredients array
            this.ingredients.push({ name: ingredientName, quantity: ingredientQuantity });

            // Update the ingredient list UI
            this.updateIngredientList();

            // Clear input fields
            document.getElementById("ingredient-name").value = '';
            document.getElementById("ingredient-quantity").value = '';
        });
    }

    // Update the ingredient list on the page
    updateIngredientList() {
        const ingredientList = document.getElementById("ingredient-list");
        ingredientList.innerHTML = '';

        this.ingredients.forEach(ingredient => {
            const listItem = document.createElement("li");
            listItem.textContent = `${ingredient.quantity} ${ingredient.name}`;
            ingredientList.appendChild(listItem);
        });

        // Show the ingredient card once ingredients are added
        document.getElementById("ingredient-list-container").style.display = "block";
    }
}

export default Meal;