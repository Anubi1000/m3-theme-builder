import {argbFromHex, CustomColor} from "@material/material-color-utilities";

export interface ExtendedColor {
    name: string
    color: string
    harmonize: boolean
}

export function mapExtendedColor(color: ExtendedColor): CustomColor {
    return {
        value: argbFromHex(color.color),
        name: color.name,
        blend: color.harmonize
    }
}
