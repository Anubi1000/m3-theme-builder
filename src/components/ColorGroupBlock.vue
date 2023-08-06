<script setup lang="ts">
import {ColorGroup} from "@material/material-color-utilities";
import ColorBlock from "./ColorBlock.vue";

defineProps<{
  name: string,
  colorGroup: ColorGroup
}>()
</script>

<template>
  <tr>
    <ColorBlock :background-color="colorGroup.color" :name="name" :foreground-color="colorGroup.onColor"/>
    <ColorBlock :background-color="colorGroup.onColor" :name="`On ${name}`" :foreground-color="colorGroup.color"/>
    <ColorBlock :background-color="colorGroup.colorContainer" :name="`${name} Container`" :foreground-color="colorGroup.onColorContainer"/>
    <ColorBlock :background-color="colorGroup.onColorContainer" :name="`On ${name} Container`" :foreground-color="colorGroup.colorContainer"/>
  </tr>
  <tr style="height: 5px"/>
</template>

<style scoped>
tr > td:first-child {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
tr > td:last-child {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
</style>
