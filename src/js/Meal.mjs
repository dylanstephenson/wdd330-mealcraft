// Class for building meal
import { capitalizeFirstLetter } from "./utils.mjs";
class Meal {
    constructor(initialData = {}) {
        this.id = initialData.id || Date.now().toString();
        this.ingredients = initialData.ingredients || [];
        this.name = initialData.name || "";
        this.appId = import.meta.env.VITE_NIX_APP_ID;
        this.appKey = import.meta.env.VITE_NIX_APP_KEY;
    }

    init() {
        this.setupMealNameInput();
        this.getIngredients();
        this.populateUI();
        this.updateIngredientList();
    }

    populateUI() {
        console.log("populateUI is called with name:", this.name, "and ingredients:", this.ingredients);
        if (this.name) {
            document.getElementById("meal-name-container").style.display = "none";
            document.getElementById("ingredient-container").style.display = "block";
            document.getElementById("meal-card-name").textContent = capitalizeFirstLetter(this.name);
        }
        if (this.ingredients.length > 0) {
            const ingredientList = document.getElementById("ingredient-list");
            ingredientList.innerHTML = '';
            this.ingredients.forEach(ingredient => {
              const li = document.createElement("li");
              li.textContent = `${ingredient}`;
              ingredientList.appendChild(li);
            });
            document.getElementById("ingredient-list-container").style.display = "block";
        }
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
            document.getElementById("meal-card-name").textContent = capitalizeFirstLetter(this.name);
        });
    }

    // Handle adding ingredients
    getIngredients() {
        const ingredientForm = document.getElementById("ingredient-form");
        console.log("ingredientForm:", ingredientForm)

        ingredientForm.addEventListener("submit", (event) => {
          event.preventDefault();
      
          const ingredientName = document.getElementById("ingredient-name").value.trim();
          const ingredientQuantity = document.getElementById("ingredient-quantity").value.trim();
            

          if (!ingredientName || !ingredientQuantity) {
            alert("Please enter both the ingredient name and quantity.");
            return;
          }
      
          // Push an object with both properties
          this.ingredients.push({ name: ingredientName, quantity: ingredientQuantity });
          console.log("New ingredient added:", { name: ingredientName, quantity: ingredientQuantity });
          
          // Update the ingredient list UI after adding
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
          const { name, quantity } = ingredient;
      
          const listItem = document.createElement("li");
          listItem.textContent = name && quantity ? `${quantity} ${name}` : "Invalid ingredient";
          ingredientList.appendChild(listItem);
        });
      
        document.getElementById("ingredient-list-container").style.display = "block";
      }
}


export default Meal;