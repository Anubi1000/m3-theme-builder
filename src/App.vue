<script setup lang="ts">
import {computed, reactive, ref} from "vue"
import {ExtendedColor, mapExtendedColor} from "./ExtendedColor.ts"
import ExtendedColorInput from "./components/ExtendedColorInput.vue"
import {customThemeFromColor} from "./m3/CustomTheme.ts"
import {argbFromHex} from "@material/material-color-utilities"
import SchemeColorBlock from "./components/SchemeColorBlock.vue"
import JSZip from "jszip"
import FileSaver from "file-saver"
import MainColorInput from "./components/MainColorInput.vue"

const primaryColor = ref("#49e851")
const extendedColors: ExtendedColor[] = reactive([])
const customTheme = computed(() => {
    return customThemeFromColor(argbFromHex(primaryColor.value), extendedColors.map(mapExtendedColor))
})

const packageId = ref("com.example")

function addNewExtendedColor() {
    extendedColors.push({
        name: "ExtendedColor",
        color: "#FFFFFF",
        harmonize: false
    })
}
function deleteExtendedColor(color: ExtendedColor) {
    const index = extendedColors.indexOf(color)
    if (index > -1) {
        extendedColors.splice(index, 1)
    }
}

async function download() {
    const zip = new JSZip()
    const theme = zip.folder("theme")

    const colorsKT = customTheme.value.toColorsKT(packageId.value)
    theme?.file("Colors.kt", colorsKT)

    if (customTheme.value.customColors.length != 0) {
        const extendedColorsKT = customTheme.value.toExtendedColorsKT(packageId.value)
        theme?.file("ExtendedColors.kt", extendedColorsKT)
    }

    const themeKT = customTheme.value.toThemeKT(packageId.value)
    theme?.file("Theme.kt", themeKT)

    const generatedZip = await zip.generateAsync({ type: "blob" })
    FileSaver.saveAs(generatedZip, "theme.zip")
}
</script>

<template>
  <div class="row">
    <div>
      <h3>Main colors</h3>
      <MainColorInput v-model:color="primaryColor" />

      <h3 style="padding-top: 30px">
        Extended colors
      </h3>
      <table class="ex">
        <tr>
          <th>Color</th>
          <th>Name</th>
          <th>Blend</th>
          <th>Delete</th>
        </tr>
        <ExtendedColorInput
          v-for="extendedColor in extendedColors"
          v-model:name="extendedColor.name"
          v-model:color="extendedColor.color"
          v-model:harmonize="extendedColor.harmonize"
          style="padding-bottom: 5px"
          @delete="deleteExtendedColor(extendedColor)"
        />
      </table>
      <button @click="addNewExtendedColor">
        New extended color
      </button>

      <div style="height: 50px" />
      <input
        v-model="packageId"
        type="text"
      >
      <button @click="download">
        Generate
      </button>
    </div>

    <div style="padding-left: 50px; flex: 1">
      <h3>Light scheme</h3>
      <SchemeColorBlock
        :scheme="customTheme.schemes.light"
        :extended-colors="customTheme.customColors"
        light
      />

      <h3 style="padding-top: 30px">
        Dark scheme
      </h3>
      <SchemeColorBlock
        :scheme="customTheme.schemes.dark"
        :extended-colors="customTheme.customColors"
        :light="false"
      />
    </div>
  </div>
</template>

<style scoped>
.ex {
  border-spacing: 0;
  table-layout: fixed;
}
</style>
