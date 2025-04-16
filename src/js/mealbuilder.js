import { loadHeaderFooter } from "./utils.mjs";
import Meal from "./Meal.mjs";

// Loads the header footer templates
loadHeaderFooter();

const user = JSON.parse(localStorage.getItem("isLoggedIn"));
if (!user) {
    window.location.href = "/login/login.html?redirected=true"; // Adjust path if needed
}

window.addEventListener("DOMContentLoaded", () => {
    const selectedMeal = sessionStorage.getItem("selected_meal");
    console.log("Selected meal from storage:", selectedMeal);
    const mealData = selectedMeal ? JSON.parse(selectedMeal) : {};
    console.log("Parsed mealData:", mealData);
    
    const meal = new Meal(mealData);
    meal.init();

    console.log("Meal after init:", meal); // Debug log
  
    sessionStorage.removeItem("selected_meal");

    document.getElementById("save-button").addEventListener("click", () => {
        // Get the current user from localStorage (or currentUser if that’s your key)
        const user = JSON.parse(localStorage.getItem("currentUser"));
        
        // Create a new recipe object from the meal instance
        const newRecipe = {
          id: meal.id,          // Preserved from Meal instance or generated new
          name: meal.name,
          ingredients: meal.ingredients
        };
        
        // Check if a recipe with the same id already exists:
        const recipeIndex = user.recipes.findIndex(recipe => recipe.id === newRecipe.id);
      
        if (recipeIndex !== -1) {
          // If found, update the existing recipe
          user.recipes[recipeIndex] = newRecipe;
          alert("Meal updated successfully!");
        } else {
          // Otherwise, add it as a new recipe
          user.recipes.push(newRecipe);
          alert("Meal saved successfully!");
        }
        
        localStorage.setItem("currentUser", JSON.stringify(user));
      })
      document.getElementById("delete-button").addEventListener("click", () => {
        const mealName = meal.name;
        const userData = JSON.parse(localStorage.getItem("currentUser"));
      
        if (!userData || !userData.recipes) {
          alert("No saved meals found.");
          return;
        }
      
        userData.recipes = userData.recipes.filter(meal => meal.name !== mealName);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        alert("Meal deleted!");
      });
    })

const appId = import.meta.env.VITE_NIX_APP_ID;
const appKey = import.meta.env.VITE_NIX_APP_KEY;

document.getElementById("nutrition-button").addEventListener("click", async () => {
  const ingredients = Array.from(document.querySelectorAll("#ingredient-list li")).map(li => li.textContent).join(", ");

  try {
    const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        "x-app-id": appId,
        "x-app-key": appKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: ingredients })
    });

    const data = await response.json();

    if (!data.foods) {
      document.getElementById("nutrition-details").innerHTML = `<p>No nutrition info available.</p>`;
    } else {
      const nutritionInfo = data.foods.map(food => `
        <p><strong>${food.food_name}</strong>: ${food.nf_calories} cal, ${food.nf_protein}g protein, ${food.nf_total_carbohydrate}g carbs, ${food.nf_total_fat}g fat</p>
      `).join("");
      document.getElementById("nutrition-details").innerHTML = nutritionInfo;
    }

    document.getElementById("nutrition-modal").classList.add("show");
  } catch (err) {
    console.error("Nutrition fetch error:", err);
    alert("Failed to fetch nutrition info.");
  }
});

// Close modal
document.getElementById("close-nutrition-modal").addEventListener("click", () => {
  document.getElementById("nutrition-modal").classList.remove("show");
});


  