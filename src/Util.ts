export function firstCharUppercase(target: string): string {
    return target.charAt(0).toUpperCase() + target.slice(1)
}

export function firstCharLowercase(target: string): string {
    return target.charAt(0).toLowerCase() + target.slice(1)
}
