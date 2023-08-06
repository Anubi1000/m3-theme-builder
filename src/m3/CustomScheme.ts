import {ColorGroup, CorePalette, CustomColorGroup, hexFromArgb, TonalPalette} from "@material/material-color-utilities";

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
        this.primaryGroup = primaryGroup;
        this.secondaryGroup = secondaryGroup;
        this.tertiaryGroup = tertiaryGroup;
        this.errorGroup = errorGroup;

        this.surfaceDim = surfaceDim;
        this.surface = surface;
        this.surfaceBright = surfaceBright;

        this.surfaceContainerLowest = surfaceContainerLowest;
        this.surfaceContainerLow = surfaceContainerLow;
        this.surfaceContainer = surfaceContainer;
        this.surfaceContainerHigh = surfaceContainerHigh;
        this.surfaceContainerHighest = surfaceContainerHighest;

        this.onSurface = onSurface;
        this.surfaceVariant = surfaceVariant;
        this.onSurfaceVariant = onSurfaceVariant;

        this.background = background;
        this.onBackground = onBackground;

        this.outline = outline;
        this.outlineVariant = outlineVariant;

        this.scrim = scrim;

        this.inverseSurface = inverseSurface;
        this.inverseOnSurface = inverseOnSurface;
        this.inversePrimary = inversePrimary;

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

    toColorKTContent(customColors: CustomColorGroup[]): string {
        const scheme = this
        let buffer = ""

        function generateLine(color: number, name: string, space: string) {
            const hex = hexFromArgb(color).slice(1).toUpperCase()
            const uiMode = scheme.isDark ? "dark" : "light";
            buffer += `val ${space}_${uiMode}_${name} = Color(0xFF${hex})\n`
        }

        const generateM3Line = (color: number, name: string) => generateLine(color, name, "m3")
        const generateSingleM3 = (name: string) => {
            // @ts-ignore
            generateM3Line(scheme[name], name)
        };

        const generateCustomLine = (color: number, name: string) => generateLine(color, name, "custom")

        function generateColorGroup(colorGroup: ColorGroup, name: string, lineFunction: (color: number, name: string) => void = generateM3Line) {
            const nameSmall = name
            const nameLarge = name.charAt(0).toUpperCase() + name.slice(1)

            lineFunction(colorGroup.color, nameSmall)
            lineFunction(colorGroup.onColor, `on${nameLarge}`)
            lineFunction(colorGroup.colorContainer, `${nameSmall}Container`)
            lineFunction(colorGroup.onColorContainer, `on${nameLarge}Container`)
        }

        generateColorGroup(this.primaryGroup, "primary")
        generateColorGroup(this.secondaryGroup, "secondary")
        generateColorGroup(this.tertiaryGroup, "tertiary")
        generateColorGroup(this.errorGroup, "error")

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
            const colorGroup = this.isDark ? customColorGroup.dark : customColorGroup.light;
            generateColorGroup(colorGroup, colorName, generateCustomLine)
        }

        return buffer
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
