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

    code(code: string, infostring: string, _escaped: boolean) {
        let flags = infostring.split("_").filter(flag => flag.length > 0)

        if (flags.length === 0 && infostring === "") {
            flags = ["gathered"]
        }

        for (const flag of flags.reverse()) {
            switch (flag) {
                case "align":
                    code = `\\begin{aligned} ${code} \\end{aligned}`
                    break
                case "left":
                    code = `left(${code})`
                    break
                case "gathered":
                    code = `\\begin{gathered} ${code} \\end{gathered}`
                    break
            }
        }

        return `<span class="mathcontainer">$$${transpileMath(code)}$$</span>`
    }
}

marked.use({ renderer: renderer as marked.Renderer })

export default function transpileMD(md: string) {
    return build(marked(md.split("@PB").join(`<span class="new-page"></span>`)))
}