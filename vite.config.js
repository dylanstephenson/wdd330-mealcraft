import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        account: resolve(__dirname, "src/account/account.html"),
        ingredients: resolve(__dirname, "src/ingredients/ingredients.html"),
        login: resolve(__dirname, "src/login/login.html"),
        mealbuilder: resolve(__dirname, "src/mealbuilder/mealbuilder.html"),
        recipes: resolve(__dirname, "src/recipes/recipes.html"),
        header: resolve(__dirname, "src/public/partials/header.html"),
        footer: resolve(__dirname, "src/public/partials/footer.html"),
      },
    },
  },
});
