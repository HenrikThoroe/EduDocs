type Macro = 
    "ZAHLEN" | "REAL" | "COMPLEX" | "NATURAL" | "RATIONAL" | "BINARY" |
    "ALPHA" | "BETA" | "GAMMA" |
    "IN" | "NOTIN" |
    "INFINITY" |
    "AND" | "OR" |
    "VSPACE"

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
        case "INFINITY":
        case "AND":
        case "OR":
        case "VSPACE":
            return true
        default: 
            return false
    }
}

export default Macro