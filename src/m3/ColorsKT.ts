import {ColorGroup, CustomColorGroup, hexFromArgb} from "@material/material-color-utilities"
import {CustomScheme} from "./CustomScheme.ts"
import {CustomTheme} from "./CustomTheme.ts"
import {firstCharUppercase} from "../Util.ts"

export function generateColorsKT(theme: CustomTheme, packageId: string): string {
    let buffer = `package ${packageId}\n\n` +
        "import androidx.compose.ui.graphics.Color\n\n"

    buffer += generateContent(theme.schemes.light, theme.customColors)
    buffer += "\n"
    buffer += generateContent(theme.schemes.dark, theme.customColors)

    console.log(buffer)

    return buffer
}

function generateContent(scheme: CustomScheme, customColors: CustomColorGroup[]): string {
    let buffer = ""

    function generateLine(color: number, name: string, space: string) {
        const hex = hexFromArgb(color).slice(1).toUpperCase()
        const uiMode = scheme.isDark ? "dark" : "light"
        buffer += `val ${space}_${uiMode}_${name} = Color(0xFF${hex})\n`
    }

    const generateM3Line = (color: number, name: string) => generateLine(color, name, "m3")
    const generateSingleM3 = (name: string) => {
        generateM3Line(scheme[name] as number, name)
    }

    const generateCustomLine = (color: number, name: string) => generateLine(color, name, "custom")

    function generateColorGroup(colorGroup: ColorGroup, name: string, lineFunction: (color: number, name: string) => void = generateM3Line) {
        const nameSmall = name
        const nameLarge = firstCharUppercase(nameSmall)

        lineFunction(colorGroup.color, nameSmall)
        lineFunction(colorGroup.onColor, `on${nameLarge}`)
        lineFunction(colorGroup.colorContainer, `${nameSmall}Container`)
        lineFunction(colorGroup.onColorContainer, `on${nameLarge}Container`)
    }

    generateColorGroup(scheme.primaryGroup, "primary")
    generateColorGroup(scheme.secondaryGroup, "secondary")
    generateColorGroup(scheme.tertiaryGroup, "tertiary")
    generateColorGroup(scheme.errorGroup, "error")

    generateSingleM3("surfaceDim")
    generateSingleM3("surface")
    generateSingleM3("surfaceBright")

    generateSingleM3("surfaceContainerLowest")
    generateSingleM3("surfaceContainerLow")
    generateSingleM3("surfaceContainer")
    generateSingleM3("surfaceContainerHigh")
    generateSingleM3("surfaceContainerHighest")

    generateSingleM3("onSurface")
    generateSingleM3("surfaceVariant")
    generateSingleM3("onSurfaceVariant")

    generateSingleM3("background")
    generateSingleM3("onBackground")

    generateSingleM3("outline")
    generateSingleM3("outlineVariant")

    generateSingleM3("scrim")

    generateSingleM3("inverseSurface")
    generateSingleM3("inverseOnSurface")
    generateSingleM3("inversePrimary")

    for (const customColorGroup of customColors) {
        const colorName = customColorGroup.color.name.charAt(0).toLowerCase() + customColorGroup.color.name.slice(1)
        const colorGroup = scheme.isDark ? customColorGroup.dark : customColorGroup.light
        generateColorGroup(colorGroup, colorName, generateCustomLine)
    }

    return buffer
}