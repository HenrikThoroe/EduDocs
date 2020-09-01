import ASTNode from "./ASTNode";
import Keyword from "../Keyword";
import BlockNode from "./BlockNode";

export default class CallNode implements ASTNode {

    constructor(public id: Keyword, public args: BlockNode) {

    }

    toString() {
        switch (this.id) {
            case "vec":
                return `\\vec{${this.args.toString()}}`
            default:
                return this.id
        }
    }

}