<script setup lang="ts">
import { schemas, type Field } from "../metdata/schemas";
import { ref, reactive } from "vue";
import { useRecipeStore } from "../store/store";

const store = useRecipeStore();
const activeTab = ref("addRecipe");
const formModel = ref({
  title: '',
  tags: '',
  ingredients: '',
  instructions: ''
});

</script>
<template>
  <div>
    <header>
      <h1>Onkel Dags oppskrifter</h1>
    </header>
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab === 'recipes' }" @click="activeTab = 'recipes'">
        Oppskrifter
      </div>
      <div class="tab" :class="{ active: activeTab === 'addRecipe' }" @click="activeTab = 'addRecipe'">
        Legg til ny oppskrift
      </div>
    </div>
    <div class="content">
      <Recipes v-if="activeTab === 'recipes'" />
      <FormRenderer v-else-if="activeTab === 'addRecipe'" 
        :schema="[
          { name: 'title', label: 'title', type: 'text' },
          { name: 'tags', label: 'tags', type: 'text' },
          { name: 'ingredients', label: 'ingredients', type: 'textarea' },
          { name: 'instructions', label: 'instructions', type: 'textarea' }
        ] as Field[]" 
        :model="formModel"
        :mode="'edit'" 
     />
    </div>

  </div>
</template>


