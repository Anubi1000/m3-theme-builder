import {CustomTheme} from "./CustomTheme.ts"
import {firstCharUppercase} from "../Util.ts"

export function generateThemeKT(theme: CustomTheme, packageId: string, themeName: string, typographyClassName: string): string {
    let buffer = `package ${packageId}\n
import android.content.Context
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.platform.LocalContext\n\n`

    buffer += generateThemeVariable(false)
    buffer += "\n"
    buffer += generateThemeVariable(true)

    buffer += `
@Composable
fun ${themeName}(
    useDarkTheme: Boolean = isSystemInDarkTheme(),
    useMaterialYou: Boolean = false,
    context: Context = LocalContext.current,
    content: @Composable () -> Unit
) {
    val colors = if (useMaterialYou && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        if (useDarkTheme) {
            dynamicDarkColorScheme(context)
        } else {
            dynamicLightColorScheme(context)
        }
    } else {
        if (useDarkTheme) {
            DarkColorScheme
        } else {
            LightColorScheme
        }
    }

    MaterialTheme(
        colorScheme = colors,
        typography = ${typographyClassName},`

    if (theme.customColors.length != 0) {
        buffer += `
        content = {
            CompositionLocalProvider(
                LocalExtendedColors provides if (useDarkTheme) darkExtendedColors() else lightExtendedColors(),
                content = content
            )
        }`
    } else {
        buffer += `
        content = content`
    }

    buffer += `
    )
}\n`

    return buffer
}

function generateThemeVariable(isDark: boolean): string {
    const uiModeSmall = isDark ? "dark" : "light"
    const uiModeLarge = firstCharUppercase(uiModeSmall)

    let buffer = `private val ${uiModeLarge}ColorScheme = ${uiModeSmall}ColorScheme(\n`

    const addColor = (name: string) => buffer += `    ${name} = m3_${uiModeSmall}_${name},\n`

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