<template>
  <div>
    <div class="form-group"><input v-model="searchQuery" placeholder="Søk oppskrifter..." /></div>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.title"
        :recipe="recipe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "../components/recipinfo.vue";
import { useRecipeStore } from "../store/store";

const store = useRecipeStore();
const searchQuery = ref("");

const filteredRecipes = computed(() =>
  store.recipes
    .map((recipe: any) => ({
      tags: [],
      ...recipe,
    }))
    .filter((recipe: any) =>
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);
</script>
