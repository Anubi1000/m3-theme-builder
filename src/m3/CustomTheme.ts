import {CorePalette, customColor, CustomColor, CustomColorGroup} from "@material/material-color-utilities";
import {CustomScheme} from "./CustomScheme";

export class CustomTheme {
    schemes: {
        light: CustomScheme
        dark: CustomScheme
    }
    corePalette: CorePalette
    customColors: CustomColorGroup[]

    constructor(schemes: { light: CustomScheme; dark: CustomScheme }, corePalette: CorePalette, customColors: CustomColorGroup[]) {
        this.schemes = schemes;
        this.corePalette = corePalette;
        this.customColors = customColors;
    }

    toColorKT(packageId: string): string {
        let buffer = `package ${packageId}\n\n` +
            "import androidx.compose.ui.graphics.Color\n\n"

        buffer += this.schemes.light.toColorKTContent(this.customColors)
        buffer += "\n"
        buffer += this.schemes.dark.toColorKTContent(this.customColors)

        console.log(buffer)

        return buffer
    }

    toThemeKT(packageId: string): string {
        let buffer = `package ${packageId}\n\n` +
            "import androidx.compose.material3.darkColorScheme\n" +
            "import androidx.compose.material3.lightColorScheme\n\n"

        buffer += generateThemeContents(false)
        buffer += "\n"
        buffer += generateThemeContents(true)

        console.log(buffer)

        return buffer
    }
}

function generateThemeContents(isDark: boolean): string {
    const uiModeSmall = isDark ? "dark" : "light"
    const uiModeLarge = isDark ? "Dark" : "Light"

    let buffer = `private val ${uiModeLarge}ColorScheme = ${uiModeSmall}ColorScheme(\n`

    const addColor = (name: string) => buffer += `    ${name} = m3_${uiModeSmall}_${name},\n`;
    function addColorWithOn(name: string) {
        const nameSmall = name
        const nameLarge = name.charAt(0).toUpperCase() + name.slice(1)

        addColor(nameSmall)
        addColor(`on${nameLarge}`)
    }
    function addColorGroup(name: string) {
        addColorWithOn(name)
        addColorWithOn(`${name}Container`)
    }

    addColorGroup("primary")
    addColor("inversePrimary")
    addColorGroup("secondary")
    addColorGroup("tertiary")
    addColorWithOn("background")
    addColorWithOn("surface")
    addColorWithOn("surfaceVariant")
    addColor("inverseSurface")
    addColor("inverseOnSurface")
    addColorGroup("error")
    addColor("outline")
    addColor("outlineVariant")
    addColor("scrim")
    addColor("surfaceBright")
    addColor("surfaceContainer")
    addColor("surfaceContainerHigh")
    addColor("surfaceContainerHighest")
    addColor("surfaceContainerLow")
    addColor("surfaceContainerLowest")
    addColor("surfaceDim")

    buffer += ")\n"

    return buffer
}

export function customThemeFromColor(argb: number, extendedColors: CustomColor[]): CustomTheme {
    const corePalette = CorePalette.contentOf(argb)
    return new CustomTheme(
        {
            light: CustomScheme.customLightSchemeFromCorePalette(corePalette),
            dark: CustomScheme.customDarkSchemeFromCorePalette(corePalette)
        },
        corePalette,
        extendedColors.map((color) => customColor(argb, color))
    )
}
