import Token from "./Token";
import BlockNode from "./AST/BlockNode";
import ASTNode from "./AST/ASTNode";
import SymbolNode from "./AST/SymbolNode";
import MacroNode from "./AST/MacroNode";
import Operator from "./Operator";
import Macro from "./Macro";
import Keyword from "./Keyword";
import CallNode from "./AST/CallNode";

export default class Parser {

    private tokens: Token[]

    private index = 0

    constructor(tokens: Token[]) {
        this.tokens = tokens
    }

    private hasNextToken() {
        return this.index + 1 < this.tokens.length
    }

    private currentToken() {
        return this.tokens[this.index]
    }

    parse(): BlockNode {
        if (this.tokens.length === 0) {
            return new BlockNode([])
        }

        const out: ASTNode[] = []
        let seperators = 0

        while (this.index < this.tokens.length) {
            const token = this.currentToken()

            switch (token.type) {
                case "latex":
                    out.push(new SymbolNode(token.value))
                    break

                case "operator":
                    out.push(new MacroNode(token.value as Operator))
                    break

                case "macro":
                    out.push(new MacroNode(token.value as Macro))
                    break

                case "seperator": 
                    if (seperators === 0) {
                        out.push(new SymbolNode(" "))
                        seperators += 1
                    } 
                    break

                case "symbol":
                    out.push(new SymbolNode(token.value))
                    break

                case "keyword":
                    this.index += 1
                    out.push(new CallNode(token.value as Keyword, this.readList()))
                    break

                case "groupFlag":
                    out.push(new SymbolNode(token.value))
                    break
            }

            if (seperators !== 0 && token.type !== "seperator") {
                seperators = 0
            }

            this.index += 1
        }

        return new BlockNode(out)
    }

    private readList(): BlockNode {
        let openGroups = 0
        const buffer: Token[] = []

        const createNode = () => {
            return new Parser(buffer).parse()
        }

        do {
            const token = this.currentToken()

            if (token.type === "groupFlag") {
                if (token.value === "(") {
                    openGroups += 1

                    if (openGroups === 1) {
                        this.index += 1
                        continue
                    }
                } else if (token.value === ")") {
                    openGroups -= 1

                    if (openGroups === 0) {
                        this.index += 1
                        continue
                    }
                } 
            }

            buffer.push(token)
            this.index += 1
        } while (openGroups > 0)

        return createNode()
    }

}