import Token from "./Token"
import { isReservedOperatorCharacter, isOperator } from "./Operator"
import { isMacro } from "./Macro"
import { isKeyword } from "./Keyword"

export default class Tokenizer {

    private raw: string

    private index: number = 0

    private tokens: Token[] = []

    constructor(code: string) {
        this.raw = code
    }

    public run(): Token[] {
        this.tokens = []

        while (this.index < this.raw.length) {
            const char = this.raw.charAt(this.index)

            if (char === "\\") {
                this.serializeLaTeX()
            } else if (isReservedOperatorCharacter(char)) {
                this.serializeOperator()
            } else if (this.isSeperator(char)) {
                this.tokens.push(new Token("seperator", char))
                this.index += 1
            } else if (["(", ")", "{", "}"].includes(char)) {
                this.tokens.push(new Token("groupFlag", char))
                this.index += 1
            } else {
                this.serializeSymbol()
            }
        }

        return this.tokens
    }

    private isSeperator(char: string): boolean {
        return ["\n", "\t", "\r", " ", "\\\\"].includes(char)
    }

    private iterate(condition: (char: string) => boolean, callback: (char: string) => void) {
        while (condition(this.raw.charAt(this.index)) && this.index < this.raw.length) {
            callback(this.raw.charAt(this.index))
            this.index += 1
        }
    }

    private serializeSymbol() {
        let value = ""

        this.iterate(char => !this.isSeperator(char) && !["(", ")", "{", "}"].includes(char), char => {
            value += char
        })

        if (isKeyword(value)) {
            this.tokens.push(new Token("keyword", value))
        } else if (isMacro(value)) {
            this.tokens.push(new Token("macro", value))
        } else {
            this.tokens.push(new Token("symbol", value))
        }
    }

    private serializeOperator() {
        let value = ""

        this.iterate(char => isReservedOperatorCharacter(char), char => {
            value += char
        })

        if (isOperator(value)) {
            this.tokens.push(new Token("operator", value))
        } else {
            this.tokens.push(new Token("symbol", value))
        }
    }

    private serializeLaTeX() {
        let value = ""

        this.iterate(char => !this.isSeperator(char), char => {
            value += char
        })

        this.tokens.push(new Token("latex", value))
    }

}