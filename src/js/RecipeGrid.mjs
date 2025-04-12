// Load and render recipes

export async function loadAndRenderRecipes() {
    try {
      const response = await fetch('/json/recipes.json');
      const recipes = await response.json();
      renderRecipeCards(recipes);
    } catch (error) {
      console.error("Failed to load recipe data:", error);
    }
  }

  export async function loadHomePageCarousel() {
    try {
      const response = await fetch('/json/recipes.json');
      const recipes = await response.json();
      renderCarousel(recipes);
    } catch (error) {
      console.error("Failed to load recipe data:", error);
    }
  }
  
  function renderRecipeCards(recipes) {
    const container = document.getElementById("recipe-container");
  
    recipes.forEach((recipe, index) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
  
      card.innerHTML = `
        <img src="${recipe.recipeImg}" alt="${recipe.recipeName}" class="recipe-img">
        <h3>${recipe.recipeName}</h3>
        <button data-index="${index}" class="view-recipe-btn">View Recipe</button>
      `;
  
      container.appendChild(card);
    });
  
    // Attach click events after cards are rendered
    document.querySelectorAll(".view-recipe-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        openModal(recipes[index]);
      });
    });
  }
  
  function openModal(recipe) {
    document.getElementById("modal-title").textContent = recipe.recipeName;
  
    // Ingredients
    const ingredientsList = document.getElementById("modal-ingredients");
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ingredientsList.appendChild(li);
    });
  
    // Cooking Steps
    const stepsContainer = document.getElementById("modal-steps");
    stepsContainer.innerHTML = recipe.cookingSteps.map(step => `<p>${step}</p>`).join("");
  
    // Show modal
    document.getElementById("recipe-modal").classList.remove("hidden");
    document.getElementById("recipe-modal").classList.add("show");
    document.body.classList.add("no-scroll");
  }

  function renderCarousel(recipes, limit = 4) {
    const carousel = document.getElementById("recipe-carousel");
  
    // Only show the first few recipes
    const selectedRecipes = recipes.slice(0, limit);
  
    selectedRecipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "carousel-card";
  
      card.innerHTML = `
        <img src="${recipe.recipeImg}" alt="${recipe.recipeName}" class="carousel-img">
        <h4>${recipe.recipeName}</h4>`;
  
      carousel.appendChild(card);
    });
}

  export function initCarouselNavigation() {
    const carousel = document.getElementById("recipe-carousel");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
  
    const scrollAmount = 250;
  
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }