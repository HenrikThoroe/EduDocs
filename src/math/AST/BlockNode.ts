import ASTNode from "./ASTNode";

export default class BlockNode implements ASTNode {

    constructor(public children: ASTNode[]) {

    }

    toString() {
        return this.children.map(child => child.toString()).join(" ")
    }

}