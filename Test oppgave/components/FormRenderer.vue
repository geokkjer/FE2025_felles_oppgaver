<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import type { Field } from '../metdata/schemas';

/* props */
const props = defineProps<{
  schema: Field[];
  model: Record<string, any>;
  mode?: 'view' | 'edit';
}>();

/* Lokal kopi i edit-modus så vi ikke skriver direkte i props */
const local = reactive({ ...props.model });
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
    <button v-if="mode === 'edit'" @click="$emit('save', local)">
      Legg til
    </button>
  </div>
</template>

<style scoped>
.row { margin-bottom: .25rem }
label { display:inline-block; width:6rem; font-weight:600 }
input, textarea { padding: .25rem; border:1px solid #ccc }
</style>