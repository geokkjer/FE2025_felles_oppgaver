<template>
  <div>
    <header>
      <h1>Onkel Dags oppskrifter</h1>
    </header>
    <!-- <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'recipes' }"
        @click="activeTab = 'recipes'"
      >
        Oppskrifter
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'addRecipe' }"
        @click="activeTab = 'addRecipe'"
      >
        Legg til ny oppskrift
      </div>
    </div> -->
    <div class="content">
      <FormRenderer 
      :schema="[
        { name: 'tittel', label: 'titel', type: 'text' },
        { name: 'Tags', label: 'tags', type: 'text' },
        { name: 'Ingredienser', label: 'ingredients', type: 'textarea' },
        { name: 'Instruksjoner', label: 'instructions', type: 'textarea' }
      ] as Field[]",
      :model="formModel"
      :mode="'edit'"
      @save="submitForm"
  />
 
    </div>
    <!-- <RecipeCard
      v-for="recipe in store.recipes"
      :key="recipe.title"
      :recipe="recipe"
      /> -->
       <Recipes />
  </div>
</template>

<script setup lang="ts">
import type { Field } from "../metdata/schemas";
import { ref, reactive } from "vue";
import { useRecipeStore } from "../store/store";
const title = ref("");
const tagsInput = ref("");
const ingredients = ref("");
const instructions = ref("");

const store = useRecipeStore();
const activeTab = ref("recipes");
const formModel = reactive({
  tittel: '',
  tags: '',
  ingredients: '',
  instructions: ''
});

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
