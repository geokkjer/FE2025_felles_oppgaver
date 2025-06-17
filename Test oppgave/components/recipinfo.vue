<template>
  <div class="recipe">
    <div class="recipe-header">
      <h3>{{ recipe.title }}</h3>
    </div>
    <h3>Tags:</h3>
    <div class="tag-list">
      <span class="tag" v-for="tag in recipe.tags" :key="tag">{{ tag }}</span>
    </div>
    <h3>ingredients:</h3>
    <ul class="ingredients-list">
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <h3>Instructions:</h3>
    <p>{{ recipe.instructions }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  recipe: {
    title: string;
    tags: string[];
    ingredients: string[];
    instructions: string;
  };
}>();
</script>

