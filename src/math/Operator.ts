type Operator = "=" | "!=" | "+" | "-" | "/" | "*" | "^" | "!" | "<=" | ">=" | "+-" | "**" | "-->" | "<--" | "==>" | "<==" | "<=>" | "<->" | "|"

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
            return true
        default:
            return false
    }
}

export function isReservedOperatorCharacter(value: string): boolean {
    return ["=", "!=", "+", "-", "/", "*", "^", "!", "<", ">", "|"].includes(value)
}

export default Operator