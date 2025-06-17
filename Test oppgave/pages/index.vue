<template>
  <div>
    <header>
      <h1>Onkel Dags oppskrifter</h1>
    </header>
    <div class="tabs">
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
    </div>
    <div class="content">
      <Recipes v-if="activeTab === 'recipes'" />
      <Recipie v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import Recipie from "../components/recipie.vue";

const activeTab = ref("recipes");
</script>
