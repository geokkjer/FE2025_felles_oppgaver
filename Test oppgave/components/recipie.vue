<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="title">Tittel</label>
      <input id="title" v-model="title" required />
    </div>
    <div class="form-group">
      <label for="tags">Tags</label>
      <input
        id="tags"
        v-model="tagsInput"
        required
        placeholder="f.eks Frokost, Vegansk, Rask"
      />
    </div>
    <div class="form-group">
      <label for="ingredients">Ingredienser</label>
      <textarea
        id="ingredients"
        v-model="ingredients"
        required
        placeholder="Skriv hver ingrediens på sin egen linje"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="instructions">Instruksjoner</label>
      <textarea
        id="instructions"
        v-model="instructions"
        required
        placeholder="Beskriv steg for steg"
      ></textarea>
    </div>
    <button type="submit">Legg til oppskrift</button>
  </form>
</template>

<script setup lang="ts">
import { useRecipeStore } from "../store/store";

const title = ref("");
const tagsInput = ref("");
const ingredients = ref("");
const instructions = ref("");

const store = useRecipeStore();

function submitForm() {
  const tags = tagsInput.value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const ingredientsArr = ingredients.value
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
  store.addRecipe({
    title: title.value,
    tags,
    ingredients: ingredientsArr,
    instructions: instructions.value,
  });
}
</script>
