import marked from "marked"
import build from "./build"

const renderer = {
    codespan(code: string) {
        return `<span class="mathcontainer-inline">\\(${code}\\)</span>`
    },

    code(code: string, _infostring: string, _escaped: boolean) {
        return `<span class="mathcontainer">$$${code}$$</span>`
    }
}

marked.use({ renderer: renderer as marked.Renderer })

export default function transpileMD(md: string) {
    return build(marked(md))
}