import marked from "marked"
import build from "./build"
import Tokenizer from "../math/Tokenizer"
import Parser from "../math/Parser"

const transpileMath = (code: string) => {
    const tokenizer = new Tokenizer(code.replace("&gt;", ">").replace("&lt;", "<"))
    const tokens = tokenizer.run()
    const parser = new Parser(tokens)
    const ast = parser.parse()

    return ast.toString()
}

const renderer = {
    codespan(code: string) {
        return `<span class="mathcontainer-inline">\\(${transpileMath(code)}\\)</span>`
    },

    code(code: string, _infostring: string, _escaped: boolean) {
        return `<span class="mathcontainer">$$${transpileMath(code)}$$</span>`
    }
}

marked.use({ renderer: renderer as marked.Renderer })

export default function transpileMD(md: string) {
    return build(marked(md))
}