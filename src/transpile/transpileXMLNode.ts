import XMLNode from "./XMLNode"
import build from "./build"

const template: string = require("../assets/template.html")
const style: string = require("../assets/styles.css")

type ValidTagName = "document" | "title" | "h1" | "h2" | "p" | "math"

export default function transpileXMLNode(node: XMLNode): string {
    const name: ValidTagName = node.getName() as ValidTagName
    const children = () => node.getChildren().map(transpileXMLNode).join("")

    switch (name) {
        case "document":
            return build(children())

        case "title":
            return `<h1>${node.getValue()}</h1>`

        case "h1":
            return `<h2>${node.getValue()}</h2>`

        case "h2":
            return `<h3>${node.getValue()}</h3>`

        case  "p":
            return `<p>${node.getValue()}</p>`

        case "math":
            const inline = node.attribute("inline", "false") === "true"

            if (inline) {
                return `<span class="inline-math">\\(${node.getValue()}\\)</span>`
            } else {
                return `<p class="math">$$${node.getValue()}$$</p>`
            }

        default: 
            return `<!-- Unsupported tag name ["${name}"] -->`
    }
}