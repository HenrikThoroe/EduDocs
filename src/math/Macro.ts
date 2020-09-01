type Macro = 
    "ZAHLEN"

export function isMacro(value: string): value is Macro {
    switch (value as Macro) {
        case "ZAHLEN":
            return true
        default: 
            return false
    }
}

export default Macro