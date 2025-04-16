import { capitalizeFirstLetter } from "./utils.mjs"

const appId = import.meta.env.VITE_NIX_APP_ID
const appKey = import.meta.env.VITE_NIX_APP_KEY
console.log(appId)
console.log(appKey)

export async function searchIngredients() {
    const searchInput = document.getElementById("ingredient-search")
    const resultsDiv = document.getElementById("results")
    searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim()
    if (query.length < 2) {
    resultsDiv.innerHTML = ""
    return
  }
    try {
     const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
      headers: {
        "x-app-id": appId,
        "x-app-key": appKey,
      },
    })
    const data = await response.json()
    const foods = data.common // you can also use data.branded for branded foods
    // Show clickable items
    resultsDiv.innerHTML = foods.map(item => `
        <div class="result-item" data-food-name="${item.food_name}">
          <img src="${item.photo.thumb}" alt="${item.food_name}" />
          <span>${capitalizeFirstLetter(item.food_name)}</span>
        </div>
      `).join("")
  
      // Add click listeners
      document.querySelectorAll(".result-item").forEach(item => {
        item.addEventListener("click", () => {
          const foodName = item.dataset.foodName
          showNutritionInfo(foodName)
        })
      })
  
    } catch (error) {
      console.error("There was a problem:", error.message)
    }
  })
}

const modalBody = document.querySelector("#modal-body")
const modal = document.querySelector("#nutrition-modal")
const modalClose = document.querySelector("#modal-close")

// Fetch and display nutrition info
async function showNutritionInfo(foodName) {
    try {
      const res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
        method: "POST",
        headers: {
          "x-app-id": appId,
          "x-app-key": appKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: foodName })
      })
  
      const data = await res.json()
      const food = data.foods[0]
  
      modalBody.innerHTML = `
        <h3>${food.food_name}</h3>
        <img src="${food.photo.thumb}" alt="${food.food_name}" />
        <ul>
          <li><strong>Calories:</strong> ${food.nf_calories}</li>
          <li><strong>Protein:</strong> ${food.nf_protein}g</li>
          <li><strong>Carbs:</strong> ${food.nf_total_carbohydrate}g</li>
          <li><strong>Fat:</strong> ${food.nf_total_fat}g</li>
          <li><strong>Serving Size:</strong> ${food.serving_qty} ${food.serving_unit}</li>
        </ul>
      `
      modal.classList.add("show")
    } catch (err) {
      console.error("Nutrition fetch error:", err)
    }
  }
  
  // Close modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show")
  })