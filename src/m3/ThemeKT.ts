import {CustomTheme} from "./CustomTheme.ts";
import {firstCharUppercase} from "../Util.ts";

export function generateThemeKT(theme: CustomTheme, packageId: string): string {
    let buffer = `package ${packageId}\n\n` +
        "import androidx.compose.material3.darkColorScheme\n" +
        "import androidx.compose.material3.lightColorScheme\n\n"

    buffer += generateContent(false)
    buffer += "\n"
    buffer += generateContent(true)

    console.log(buffer)

    return buffer
}

function generateContent(isDark: boolean): string {
    const uiModeSmall = isDark ? "dark" : "light"
    const uiModeLarge = firstCharUppercase(uiModeSmall)

    let buffer = `private val ${uiModeLarge}ColorScheme = ${uiModeSmall}ColorScheme(\n`

    const addColor = (name: string) => buffer += `    ${name} = m3_${uiModeSmall}_${name},\n`;

    function addColorWithOn(name: string) {
        const nameSmall = name
        const nameLarge = firstCharUppercase(name)

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