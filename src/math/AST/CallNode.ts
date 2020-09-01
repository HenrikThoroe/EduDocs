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
            case "matrix":
                const joinRow = (row: ASTNode) => {
                    if (row instanceof BlockNode) {
                        return row.toString(" & ")
                    } else {
                        return row.toString()
                    }
                }
                return `
                    \\begin{pmatrix}
                        ${this.args.children.map(joinRow).join(" \\\\ ")}
                    \\end{pmatrix}
                `
            default:
                return this.id
        }
    }

}