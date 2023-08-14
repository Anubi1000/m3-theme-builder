import {
    CorePalette,
    customColor,
    CustomColor,
    CustomColorGroup,
    Hct,
    TonalPalette
} from "@material/material-color-utilities"
import {CustomScheme} from "./CustomScheme"
import {generateColorsKT} from "./ColorsKT.ts"
import {generateThemeKT} from "./ThemeKT.ts"
import {generateExtendedColorsKT} from "./ExtendedColorsKT.ts"

export class CustomTheme {
    schemes: {
        light: CustomScheme
        dark: CustomScheme
    }
    corePalette: CorePalette
    customColors: CustomColorGroup[]

    constructor(schemes: { light: CustomScheme; dark: CustomScheme }, corePalette: CorePalette, customColors: CustomColorGroup[]) {
        this.schemes = schemes
        this.corePalette = corePalette
        this.customColors = customColors
    }

    toColorsKT(packageId: string): string {
        return generateColorsKT(this, packageId)
    }

    toThemeKT(packageId: string, themeName: string, typographyClassName: string): string {
        return generateThemeKT(this, packageId, themeName, typographyClassName)
    }

    toExtendedColorsKT(packageId: string): string {
        return generateExtendedColorsKT(this, packageId)
    }
}

function generateCorePalette(argb: number): CorePalette {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const palette = new CorePalette(argb, false)

    const hue = Hct.fromInt(argb).hue
    palette.n1 = TonalPalette.fromHueAndChroma(hue, 6)

    return palette
}

export function customThemeFromColor(argb: number, extendedColors: CustomColor[]): CustomTheme {
    const corePalette = generateCorePalette(argb)
    return new CustomTheme(
        {
            light: CustomScheme.customLightSchemeFromCorePalette(corePalette),
            dark: CustomScheme.customDarkSchemeFromCorePalette(corePalette)
        },
        corePalette,
        extendedColors.map((color) => customColor(argb, color))
    )
}
