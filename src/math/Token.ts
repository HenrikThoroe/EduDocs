export type TokenType = "latex" | "keyword" | "operator" | "symbol" | "groupFlag" | "seperator" | "macro"

export default class Token {

    public readonly type: TokenType

    public readonly value: string

    constructor(type: TokenType, value: string) {
        this.type = type
        this.value = value
    }

}