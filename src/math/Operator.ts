type Operator = "=" | "!=" | "+" | "-" | "/" | "*" | "^" | "!" | "<=" | ">=" | "+-" | "**" | "-->" | "<--" | "==>" | "<==" | "<=>" | "<->" | "|" | "_"

export function isOperator(value: string): value is Operator {
    switch (value as Operator) {
        case "=":
        case "!=":
        case "+":
        case "-":
        case "/":
        case "*":
        case "^":
        case "!":
        case "<=":
        case ">=":
        case "+-":
        case "**":
        case "-->": 
        case "<--": 
        case "==>": 
        case "<==": 
        case "<=>":
        case "<->":
        case "_":
            return true
        default:
            return false
    }
}

export function isReservedOperatorCharacter(value: string): boolean {
    return ["=", "!=", "+", "-", "/", "*", "^", "!", "<", ">", "|", "_"].includes(value)
}

export default Operator