import ASTNode from "./ASTNode";
import Keyword from "../Keyword";
import Operator from "../Operator";
import Macro from "../Macro";

export default class MacroNode implements ASTNode {

    public type = "macro"

    constructor(public symbol: Macro | Operator) {

    }

    toString() {
        switch (this.symbol) {
            // Macros
            case "ZAHLEN": 
                return "\\mathbb{Z}"
            case "NATURAL": 
                return "\\mathbb{N}"
            case "RATIONAL": 
                return "\\mathbb{Q}"
            case "BINARY": 
                return "\\mathbb{B}"
            case "COMPLEX": 
                return "\\mathbb{C}"
            case "REAL": 
                return "\\mathbb{R}"

            case "IN":
                return "\\in"
            case "NOTIN":
                return "\\notin"

            case "ALPHA":
                return "\\alpha"
            case "BETA":
                return "\\beta"
            case "GAMMA":
                return "\\gamma"
            case "DELTA":
                return "\\Delta"

            case "INFINITY":
                return "\\infty"

            case "INTEGRAL":
                return "\\int"

            // Operators
            case "!=":
                return "\\ne"
            case "<=":
                return "\\leq"
            case ">=":
                return "\\geq"
            case "*":
                return "\\times"
            case "/":
                return "\\div"
            case "+-":
                return "\\pm"
            case "**":
                return "\\cdot"
            case "-->":
                return "\\rightarrow" 
            case "<--":
                return "\\leftarrow" 
            case "==>":
                return "\\Rightarrow" 
            case "<==":
                return "\\Leftarrow" 
            case "<=>":
                return "\\Leftrightarrow"
            case "<->":
                return "\\leftrightarrow"
            case "AND":
                return "\\cap"
            case "OR":
                return "\\cup"

            // Layout
            case "VSPACE":
                return "\\\\"

            default: 
                return this.symbol 
        }
    }

}