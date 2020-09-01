import ASTNode from "./ASTNode";
import Keyword from "../Keyword";
import Operator from "../Operator";
import Macro from "../Macro";

export default class MacroNode implements ASTNode {

    constructor(public symbol: Macro | Operator) {

    }

    toString() {
        switch (this.symbol) {
            case "ZAHLEN": 
                return "\\mathbb{Z}"
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
            default: 
                return this.symbol 
        }
    }

}