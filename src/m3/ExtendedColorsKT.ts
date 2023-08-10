import {CustomTheme} from "./CustomTheme.ts"
import {firstCharLowercase, firstCharUppercase} from "../Util.ts"

export function generateExtendedColorsKT(theme: CustomTheme, packageId: string): string {
    let buffer = `package ${packageId}\n\n` +
        "import androidx.compose.material3.MaterialTheme\n" +
        "import androidx.compose.runtime.Composable\n" +
        "import androidx.compose.runtime.ReadOnlyComposable\n" +
        "import androidx.compose.runtime.staticCompositionLocalOf\n" +
        "import androidx.compose.ui.graphics.Color\n\n"

    const customColorNames = theme.customColors.map(color => color.color.name)
    buffer += generateClass(customColorNames)

    buffer += "fun lightExtendedColors() = ExtendedColors()\n\n"

    buffer += generateDarkExtendedColors(customColorNames)

    buffer += "val LocalExtendedColors = staticCompositionLocalOf { ExtendedColors() }\n\n" +
        "val MaterialTheme.extendedColors: ExtendedColors\n" +
        "    @Composable\n" +
        "    @ReadOnlyComposable\n" +
        "    get() = LocalExtendedColors.current\n"

    return buffer
}

function generateClass(customColorNames: string[]): string {
    let buffer = "class ExtendedColors(\n"

    function generateLine(name: string) {
        buffer += `    val ${name}: Color = custom_light_${name},\n`
    }

    function generateColorGroup(name: string) {
        const nameSmall = firstCharLowercase(name)
        const nameLarge = firstCharUppercase(name)

        generateLine(nameSmall)
        generateLine(`on${nameLarge}`)
        generateLine(`${nameSmall}Container`)
        generateLine(`on${nameLarge}Container`)
    }

    customColorNames.forEach(generateColorGroup)

    buffer += ")\n\n"

    console.log(buffer)

    return buffer
}

function generateDarkExtendedColors(customColorNames: string[]): string {
    let buffer = "fun darkExtendedColors() = ExtendedColors(\n"

    function generateLine(name: string) {
        buffer += `    ${name} = custom_dark_${name},\n`
    }

    function generateColorGroup(name: string) {
        const nameSmall = firstCharLowercase(name)
        const nameLarge = firstCharUppercase(name)

        generateLine(nameSmall)
        generateLine(`on${nameLarge}`)
        generateLine(`${nameSmall}Container`)
        generateLine(`on${nameLarge}Container`)
    }

    customColorNames.forEach(generateColorGroup)

    buffer += ")\n\n"

    console.log(buffer)

    return buffer
}
