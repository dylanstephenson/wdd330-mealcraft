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

    // Nutrition facts
    const nutritionContainer = document.getElementById("modal-nutrition");
    nutritionContainer.innerHTML = `<p>Loading nutrition facts...</p>`;
    showNutritionFacts(recipe.ingredients, nutritionContainer);
  
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
      <a class="recipe-links" href="recipes/recipes.html">
        <img src="${recipe.recipeImg}" alt="${recipe.recipeName}" class="carousel-img">
        <h4>${recipe.recipeName}</h4>
      </a>`;
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

const appId = import.meta.env.VITE_NIX_APP_ID;
const appKey = import.meta.env.VITE_NIX_APP_KEY;

async function showNutritionFacts(ingredientsList) {
  try {
    const query = ingredientsList.join(", ");
    const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        "x-app-id": appId,
        "x-app-key": appKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const food = data.foods[0]; // Optional: loop through all if needed

    const nutritionContainer = document.getElementById("modal-nutrition");
    nutritionContainer.innerHTML = `
      <h4>Nutrition Facts</h4>
      <p><strong>Calories:</strong> ${food.nf_calories}</p>
      <p><strong>Protein:</strong> ${food.nf_protein}g</p>
      <p><strong>Carbs:</strong> ${food.nf_total_carbohydrate}g</p>
      <p><strong>Fat:</strong> ${food.nf_total_fat}g</p>
    `;

    // Show modal if it's separate or scroll into view if shared
    nutritionContainer.scrollIntoView({ behavior: "smooth" });

  } catch (err) {
    console.error("NutritionIX API error:", err);
  }
}