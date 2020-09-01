type Keyword = 
    "vec" |
    "matrix"

export function isKeyword(value: string): value is Keyword {
    switch (value as Keyword) {
        case "vec":
        case "matrix":
            return true
        default: 
            return false
    }
}

export default Keyword