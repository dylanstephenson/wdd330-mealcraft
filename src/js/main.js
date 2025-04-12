import { loadHeaderFooter } from "./utils.mjs";
import { loadHomePageCarousel, initCarouselNavigation } from "./RecipeGrid.mjs";

// Loads the header footer templates
loadHeaderFooter();
  
document.addEventListener("DOMContentLoaded", () => {
    loadHomePageCarousel();
    initCarouselNavigation();
});