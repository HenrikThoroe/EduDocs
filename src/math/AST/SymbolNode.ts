import ASTNode from "./ASTNode";

export default class SymbolNode implements ASTNode {

    public type = "symbol"

    constructor(public symbol: string) {

    }

    toString() {
        return this.symbol
    }

}