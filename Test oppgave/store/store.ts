import { defineStore } from "pinia";
import type { Recipe } from "../types/types";

export const useRecipeStore = defineStore("recipes", {
  state: () => ({
    recipes: [] as Recipe[],
  }),
  actions: {
    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
    },
  },
});
