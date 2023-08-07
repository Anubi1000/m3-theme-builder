<script setup lang="ts">
import {CustomScheme} from "../m3/CustomScheme"
import ColorBlock from "./ColorBlock.vue"
import ColorGroupBlock from "./ColorGroupBlock.vue"
import {argbFromHex, CustomColorGroup} from "@material/material-color-utilities"

defineProps<{
  scheme: CustomScheme,
  light: boolean,
  extendedColors: CustomColorGroup[]
}>()
</script>

<template>
  <table class="schemeColorBlockTable">
    <ColorGroupBlock
      :color-group="scheme.primaryGroup"
      name="Primary"
    />
    <ColorGroupBlock
      :color-group="scheme.secondaryGroup"
      name="Secondary"
    />
    <ColorGroupBlock
      :color-group="scheme.tertiaryGroup"
      name="Tertiary"
    />
    <ColorGroupBlock
      :color-group="scheme.errorGroup"
      name="Error"
    />

    <tr id="surfaceRow">
      <ColorBlock
        :background-color="scheme.surfaceContainerLowest"
        name="Surface Container Lowest"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.surfaceDim"
        name="Surface Dim"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.surface"
        name="Surface"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.surfaceBright"
        name="Surface Bright"
        :foreground-color="scheme.onSurface"
      />
    </tr>

    <tr>
      <ColorBlock
        :background-color="scheme.surfaceContainerLow"
        name="Surface Container Low"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.surfaceContainer"
        name="Surface Container"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.surfaceContainerHigh"
        name="Surface Container High"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.surfaceContainerHighest"
        name="Surface Container Highest"
        :foreground-color="scheme.onSurface"
      />
    </tr>

    <tr>
      <ColorBlock
        :background-color="scheme.onSurface"
        name="On Surface"
        :foreground-color="scheme.surface"
      />
      <ColorBlock
        :background-color="scheme.surfaceVariant"
        name="Surface Variant"
        :foreground-color="scheme.onSurfaceVariant"
      />
      <ColorBlock
        :background-color="scheme.onSurfaceVariant"
        name="On Surface Variant"
        :foreground-color="scheme.surfaceVariant"
      />
      <ColorBlock
        :background-color="scheme.background"
        name="Background"
        :foreground-color="scheme.onBackground"
      />
    </tr>

    <tr id="otherRow">
      <ColorBlock
        :background-color="scheme.outline"
        name="Outline"
        :foreground-color="scheme.surface"
      />
      <ColorBlock
        :background-color="scheme.outlineVariant"
        name="Outline Variant"
        :foreground-color="scheme.onSurface"
      />
      <ColorBlock
        :background-color="scheme.scrim"
        name="Scrim"
        :foreground-color="argbFromHex('#FFFFFF')"
      />
      <ColorBlock
        :background-color="scheme.onBackground"
        name="On Background"
        :foreground-color="scheme.background"
      />
    </tr>
    <tr style="height: 5px" />

    <ColorGroupBlock
      v-for="color in extendedColors"
      :color-group="light ? color.light : color.dark"
      :name="color.color.name"
    />
  </table>
</template>

<style>
.schemeColorBlockTable {
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
}
#surfaceRow > td:first-child {
  border-top-left-radius: 25px;
}
#surfaceRow > td:last-child {
  border-top-right-radius: 25px;
}
#otherRow > td:first-child {
  border-bottom-left-radius: 25px;
}
#otherRow > td:last-child {
  border-bottom-right-radius: 25px;
}
</style>