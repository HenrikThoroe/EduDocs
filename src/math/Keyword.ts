type Keyword = 
    "vec" 

export function isKeyword(value: string): value is Keyword {
    switch (value as Keyword) {
        case "vec":
            return true
        default: 
            return false
    }
}

export default Keyword