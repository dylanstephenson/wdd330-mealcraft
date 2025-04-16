import { loadHeaderFooter } from "./utils.mjs";

// Loads the header footer templates
loadHeaderFooter();

window.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    const select = document.getElementById("select-meal");
  
    if (userData?.recipes && userData.recipes.length > 0) {
      userData.recipes.forEach((recipe, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = recipe.name || `Meal ${index + 1}`;
        select.appendChild(option);
      });
    }
  });
  
  document.getElementById("load-meal-button").addEventListener("click", () => {
    const selectedIndex = document.getElementById("select-meal").value;
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    const selectedMeal = userData.recipes[selectedIndex];
  
    // Save selected meal to sessionStorage for temporary passing
    sessionStorage.setItem("selected_meal", JSON.stringify(selectedMeal));
  
    // Redirect back to meal builder
    window.location.href = "/mealbuilder/mealbuilder.html";
  });