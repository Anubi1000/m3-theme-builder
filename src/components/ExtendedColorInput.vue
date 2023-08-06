<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps<{
  name: string,
  color: string,
  harmonize: boolean
}>()
const emit = defineEmits<{
  (e: 'update:name', name: string): void,
  (e: 'update:color', color: string): void,
  (e: 'update:harmonize', harmonize: boolean): void,
  (e: 'delete'): void
}>()

const harmonizeBoolean = ref(props.harmonize)

watch(harmonizeBoolean, (value) => {
  emit("update:harmonize", value)
})
</script>

<template>
  <tr>
    <td>
      <div style="height: 5px"/>
    </td>
  </tr>
  <tr class="extendedColorInputRow">
    <td>
      <input type="color" class="extendedColorInput" @input="$emit('update:color', ($event.target as HTMLInputElement).value)" :value="color">
    </td>
    <td>
      <input type="text" @input="$emit('update:name', ($event.target as HTMLInputElement).value)" :value="name">
    </td>
    <td style="text-align: center">
      <input type="checkbox" v-model="harmonizeBoolean">
    </td>
    <td>
      <button @click="$emit('delete')">Delete</button>
    </td>
  </tr>
</template>

<style>
.extendedColorInput {
  appearance: none;
  border: none;
  background-color: var(--on-background-color);
  outline: none;
  height: 60px;
  width: 60px;
}

tr.extendedColorInputRow > td {
  background-color: var(--on-background-color);
}

tr.extendedColorInputRow > td:first-child {
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

tr.extendedColorInputRow > td:last-child {
  padding-right: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>