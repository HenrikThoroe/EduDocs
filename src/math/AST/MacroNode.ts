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
            default: 
                return this.symbol 
        }
    }

}