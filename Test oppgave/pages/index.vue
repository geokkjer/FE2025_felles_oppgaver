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
      <Recipes v-if="activeTab === 'recipes'" />
      <FormRenderer 
      :schema="[
        { name: 'Tittel', label: 'tittel', type: 'number' },
        { name: 'Tags', label: 'tags', type: 'text' },
        { name: 'Ingredienser', label: 'ingredients', type: 'textarea' },
        { name: 'Instruksjoner', label: 'instructions', type: 'textarea' }
      ] as Field[]",
      :model="formModel"
      :mode="'edit'"
      @save="submitForm"
  />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Field } from "../metdata/schemas";
import { ref, reactive } from "vue";

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
