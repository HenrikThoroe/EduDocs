import ASTNode from "./ASTNode";
import Keyword from "../Keyword";
import BlockNode from "./BlockNode";

export default class CallNode implements ASTNode {

    public type = "call"

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
            case "sum":
                if (this.args.children.length !== 3) {
                    return "SUMMATION REQUIRES THREE ARGUMENTS"
                }
                
                return `\\sum_{${this.args.children[0].toString()}=${this.args.children[1].toString()}}^{${this.args.children[2].toString()}}`

            case "foreach":
                return `\\forall {${this.args.toString()}}`

            case "frac":
                if (this.args.children.length !== 2) {
                    return "FRACTION REQUIRES TWO ARGUMENTS"
                }

                return `\\frac{${this.args.children[0].toString()}}{${this.args.children[1].toString()}}`

            case "sqrt":
                return `\\sqrt{${this.args.toString()}}`

            case "root":
                if (this.args.children.length !== 2) {
                    return "ROOT REQUIRES TWO ARGUMENTS"
                }

                return `\\sqrt[${this.args.children[0].toString()}]{${this.args.children[1].toString()}}`

            case "limit":
                if (this.args.children.length !== 2) {
                    return "LIMIT REQUIRES TWO ARGUMENTS"
                }

                return `\\lim_{${this.args.children[0].toString()}\\to${this.args.children[1].toString()}}`

            case "integral":
                if (this.args.children.length !== 2) {
                    return "INTEGRAL REQUIRES TWO ARGUMENTS"
                }
                
                return `\\int_{${this.args.children[0].toString()}}^{${this.args.children[1].toString()}}`

            case "text":
                return `\\text{${this.args.toString()}}`

            case "abs":
                return `\\left| ${this.args.toString()} \\right|`

            case "align":
                return `\\begin{aligned} ${this.args.toString()} \\end{aligned}`

            case "sub":
                if (this.args.children.length !== 2) {
                    return "SUB REQUIRES TWO ARGUMENTS"
                }

                return `${this.args.children[0].toString()}_{${this.args.children[1].toString()}}`

            case "left":
                return `\\begin{aligned} ${this.args.lines().map(line => `& ${line.toString()}`).join(" ")} \\end{aligned}`

            case "group":
                return `\\\\ ${this.args.toString()} \\\\`

            case "dist":
                return `\\overline{${this.args.toString()}}`

            default:
                return this.id
        }
    }

}