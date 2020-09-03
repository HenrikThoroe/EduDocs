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

    private readonly flatBlocks: boolean = true

    constructor(tokens: Token[], flatBlocks: boolean = true) {
        this.tokens = tokens
        this.flatBlocks = flatBlocks
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
                    if (token.value === "\n" && seperators === 0) {
                        seperators += 1
                        out.push(new SymbolNode("\\\\[8pt]"))
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
                    const list = this.readList()
                    const children = list.children
                    const items: ASTNode[] = this.flatBlocks ? [new SymbolNode("("), ...children, new SymbolNode(")")] : [list as ASTNode]
                    out.push(...items)
                    break
            }

            if (seperators !== 0 && token.value !== "\n") {
                seperators = 0
            }

            this.index += 1
        }

        const removeTrailingWhitespace = () => {
            while (out.length > 0 && out[out.length - 1].type === "symbol" && out[out.length - 1].toString().startsWith("\\\\")) {
                out.pop()
            }
        }

        removeTrailingWhitespace()
        out.reverse()
        removeTrailingWhitespace()
        out.reverse()

        return new BlockNode(out)
    }

    private readList(): BlockNode {
        let openGroups = 0
        const buffer: Token[] = []

        const createNode = () => {
            return new Parser(buffer, false).parse()
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
                        continue
                    }
                } 
            }

            buffer.push(token)
            this.index += 1
        } while (openGroups > 0 && this.hasNextToken())

        return createNode()
    }

}