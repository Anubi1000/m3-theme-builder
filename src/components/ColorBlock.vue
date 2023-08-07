<script setup lang="ts">
import {hexFromArgb} from "@material/material-color-utilities"
import {computed} from "vue"

const props = defineProps<{
  name: string,
  foregroundColor: number,
  backgroundColor: number
}>()

const text = computed(() => {
    return `${props.name} (${hexFromArgb(props.backgroundColor).toUpperCase()})`
})
</script>

<template>
  <td :style="{ backgroundColor: hexFromArgb(backgroundColor)}">
    <div class="colorBlockContainer">
      <p
        class="colorBlockText"
        :style="{ color: hexFromArgb(foregroundColor) }"
      >
        {{ text }}
      </p>
    </div>
  </td>
</template>

<style>
.colorBlockContainer {
  min-height: 90px;
  padding: 0;
  margin: 0;
}
.colorBlockText {
  padding: 10px;
  font-weight: bold;
  margin: 0;
}
</style>