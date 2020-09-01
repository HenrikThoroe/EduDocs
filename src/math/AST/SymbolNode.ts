import ASTNode from "./ASTNode";

export default class SymbolNode implements ASTNode {

    constructor(public symbol: string) {

    }

    toString() {
        return this.symbol
    }

}