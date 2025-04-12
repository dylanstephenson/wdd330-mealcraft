import { loadHeaderFooter } from "./utils.mjs";
import { loadAndRenderRecipes } from "./RecipeGrid.mjs";


// Loads the header footer templates


loadHeaderFooter();

// Close modal
document.getElementById("close-modal").addEventListener("click", () => {
    document.body.classList.remove("no-scroll");
    document.getElementById("recipe-modal").classList.remove("show");
    document.getElementById("recipe-modal").classList.add("hidden");
  });
  
document.addEventListener("DOMContentLoaded", loadAndRenderRecipes);
  