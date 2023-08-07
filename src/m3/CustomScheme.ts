import {ColorGroup, CorePalette, TonalPalette} from "@material/material-color-utilities"

export class CustomScheme {
    readonly primaryGroup: ColorGroup
    readonly secondaryGroup: ColorGroup
    readonly tertiaryGroup: ColorGroup
    readonly errorGroup: ColorGroup

    readonly surfaceDim: number
    readonly surface: number
    readonly surfaceBright: number

    readonly surfaceContainerLowest: number
    readonly surfaceContainerLow: number
    readonly surfaceContainer: number
    readonly surfaceContainerHigh: number
    readonly surfaceContainerHighest: number

    readonly onSurface: number
    readonly surfaceVariant: number
    readonly onSurfaceVariant: number

    readonly background: number
    readonly onBackground: number

    readonly outline: number
    readonly outlineVariant: number

    readonly scrim: number

    readonly inverseSurface: number
    readonly inverseOnSurface: number
    readonly inversePrimary: number

    readonly isDark: boolean

    private constructor(
        primaryGroup: ColorGroup, secondaryGroup: ColorGroup, tertiaryGroup: ColorGroup, errorGroup: ColorGroup,
        surfaceDim: number, surface: number, surfaceBright: number,
        surfaceContainerLowest: number, surfaceContainerLow: number, surfaceContainer: number, surfaceContainerHigh: number, surfaceContainerHighest: number,
        onSurface: number, surfaceVariant: number, onSurfaceVariant: number,
        background: number, onBackground: number,
        outline: number, outlineVariant: number,
        scrim: number, inverseSurface: number,
        inverseOnSurface: number, inversePrimary: number,
        isDark: boolean
    ) {
        this.primaryGroup = primaryGroup
        this.secondaryGroup = secondaryGroup
        this.tertiaryGroup = tertiaryGroup
        this.errorGroup = errorGroup

        this.surfaceDim = surfaceDim
        this.surface = surface
        this.surfaceBright = surfaceBright

        this.surfaceContainerLowest = surfaceContainerLowest
        this.surfaceContainerLow = surfaceContainerLow
        this.surfaceContainer = surfaceContainer
        this.surfaceContainerHigh = surfaceContainerHigh
        this.surfaceContainerHighest = surfaceContainerHighest

        this.onSurface = onSurface
        this.surfaceVariant = surfaceVariant
        this.onSurfaceVariant = onSurfaceVariant

        this.background = background
        this.onBackground = onBackground

        this.outline = outline
        this.outlineVariant = outlineVariant

        this.scrim = scrim

        this.inverseSurface = inverseSurface
        this.inverseOnSurface = inverseOnSurface
        this.inversePrimary = inversePrimary

        this.isDark = isDark
    }

    static customLightSchemeFromCorePalette(corePalette: CorePalette): CustomScheme {
        return new CustomScheme(
            getLightColorGroup(corePalette.a1),
            getLightColorGroup(corePalette.a2),
            getLightColorGroup(corePalette.a3),
            getLightColorGroup(corePalette.error),

            corePalette.n1.tone(87),
            corePalette.n1.tone(98),
            corePalette.n1.tone(98),

            corePalette.n1.tone(100),
            corePalette.n1.tone(96),
            corePalette.n1.tone(94),
            corePalette.n1.tone(92),
            corePalette.n1.tone(90),

            corePalette.n1.tone(10),
            corePalette.n2.tone(90),
            corePalette.n2.tone(30),

            corePalette.n1.tone(99),
            corePalette.n1.tone(10),

            corePalette.n2.tone(50),
            corePalette.n2.tone(80),

            corePalette.n1.tone(0),

            corePalette.n1.tone(20),
            corePalette.n1.tone(95),
            corePalette.a1.tone(80),

            false
        )
    }

    static customDarkSchemeFromCorePalette(corePalette: CorePalette): CustomScheme {
        return new CustomScheme(
            getDarkColorGroup(corePalette.a1),
            getDarkColorGroup(corePalette.a2),
            getDarkColorGroup(corePalette.a3),
            getDarkColorGroup(corePalette.error),

            corePalette.n1.tone(6),
            corePalette.n1.tone(6),
            corePalette.n1.tone(24),

            corePalette.n1.tone(4),
            corePalette.n1.tone(10),
            corePalette.n1.tone(12),
            corePalette.n1.tone(17),
            corePalette.n1.tone(22),

            corePalette.n1.tone(90),
            corePalette.n2.tone(30),
            corePalette.n2.tone(80),

            corePalette.n1.tone(10),
            corePalette.n1.tone(90),

            corePalette.n2.tone(60),
            corePalette.n2.tone(30),

            corePalette.n1.tone(0),

            corePalette.n1.tone(90),
            corePalette.n1.tone(20),
            corePalette.a1.tone(40),

            true
        )
    }
}

function getLightColorGroup(tonalPalette: TonalPalette): ColorGroup {
    return {
        color: tonalPalette.tone(40),
        onColor: tonalPalette.tone(100),
        colorContainer: tonalPalette.tone(90),
        onColorContainer: tonalPalette.tone(10)
    }
}

function getDarkColorGroup(tonalPalette: TonalPalette): ColorGroup {
    return {
        color: tonalPalette.tone(80),
        onColor: tonalPalette.tone(20),
        colorContainer: tonalPalette.tone(30),
        onColorContainer: tonalPalette.tone(90)
    }
}
