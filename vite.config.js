import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        header: resolve(__dirname, "src/public/partials/header.html"),
        footer: resolve(__dirname, "src/public/partials/footer.html"),
      },
    },
  },
});
