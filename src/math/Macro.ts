type Macro = 
    "ZAHLEN" | "REAL" | "COMPLEX" | "NATURAL" | "RATIONAL" | "BINARY" |
    "ALPHA" | "BETA" | "GAMMA" |
    "IN" | "NOTIN"

export function isMacro(value: string): value is Macro {
    switch (value as Macro) {
        case "ZAHLEN":
        case "REAL":
        case "COMPLEX":
        case "NATURAL":
        case "RATIONAL":
        case "BINARY":
        case "ALPHA":
        case "BETA":
        case "GAMMA":
        case "IN":
        case "NOTIN":
            return true
        default: 
            return false
    }
}

export default Macro