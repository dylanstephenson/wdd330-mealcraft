import { loadHeaderFooter } from "./utils.mjs";
import Meal from "./Meal.mjs";

// Loads the header footer templates
loadHeaderFooter();

const meal = new Meal();

meal.init();