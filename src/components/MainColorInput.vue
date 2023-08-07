<script setup lang="ts">
defineProps<{
  color: string
}>()
defineEmits<{
  (e: "update:color", color: string): void,
}>()
</script>

<template>
  <div class="row mainColorInputCard">
    <input
      type="color"
      class="mainColorInput"
      :value="color"
      @input="$emit('update:color', ($event.target as HTMLInputElement).value)"
    >
    <p class="mainColorInputLabel">
      Primary
    </p>
  </div>
</template>

<style>
.mainColorInput {
  appearance: none;
  border: none;
  background-color: var(--on-background-color);
  outline: none;
  height: 60px;
  width: 60px;
}

.mainColorInputLabel {
  padding-left: 10px;
}

.mainColorInputCard {
  background-color: var(--on-background-color);
  padding: 5px;
  border-radius: 5px;
}
</style>