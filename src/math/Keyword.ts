type Keyword = 
    "vec" |
    "matrix" |
    "sum" |
    "foreach" |
    "root" | 
    "sqrt" |
    "frac"

export function isKeyword(value: string): value is Keyword {
    switch (value as Keyword) {
        case "vec":
        case "matrix":
        case "sum":
        case "foreach":
        case "root":
        case "sqrt":
        case "frac":
            return true
        default: 
            return false
    }
}

export default Keyword