<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import type { Field } from '../metdata/schemas';
import { useRecipeStore } from '../store/store';

const store = useRecipeStore();

/* props */
const props = defineProps<{
  schema: Field[];
  model: Record<string, any>;
  mode?: 'view' | 'edit';
}>();

/* Lokal kopi i edit-modus så vi ikke skriver direkte i props */
const local = reactive({ ...props.model });
function submitForm() {
  const tags = local.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const ingredientsArr = local.ingredients
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
    
  const recipeData = {
    title: local.title,
    tags,
    ingredients: ingredientsArr,
    instructions: local.instructions,
  };
  console.log("Submitting recipe:", recipeData);
  store.addRecipe(recipeData);
  
  // Reset form after submission
  Object.assign(local, {
    title: '',
    tags: '',
    ingredients: '',
    instructions: ''
  });
}
</script>

<template>
  <div class="form">
    <div v-for="f in schema" :key="f.name" class="row">
      <label>{{ f.label }}:</label>

      <!-- ===== VISNING ===== -->
      <template v-if="mode === 'view'">
        <span>{{ model[f.name] }}</span>
      </template>

      <!-- ===== REDIGERING ===== -->
      <template v-else>
        <input
          v-if="f.type !== 'textarea'"
          v-model="local[f.name]"
          :type="f.type" />

        <textarea
          v-else
          v-model="local[f.name]" />
      </template>
    </div>

    <!-- Lagre-knapp vises bare i edit -->
  <button v-if="mode === 'edit'" @click="submitForm" class="btn btn-primary">
      Legg til
    </button> 
  </div>
</template>

<style scoped>
.row { margin-bottom: .25rem }
label { display:inline-block; width:6rem; font-weight:600 }
input, textarea { padding: .25rem; border:1px solid #ccc }
</style>