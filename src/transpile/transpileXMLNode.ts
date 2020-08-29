import XMLNode from "./XMLNode"

const template: string = require("../assets/template.html")

type ValidTagName = "document" | "title" | "h1" | "h2" | "p" | "math"

export default function transpileXMLNode(node: XMLNode): string {
    const name: ValidTagName = node.getName() as ValidTagName
    const children = () => node.getChildren().map(transpileXMLNode).join("")

    switch (name) {
        case "document":
            return template.replace("$root$", children())

        case "title":
            return `<h1>${node.getValue()}</h1>`

        case "h1":
            return `<h2>${node.getValue()}</h2>`

        case "h2":
            return `<h3>${node.getValue()}</h3>`

        case  "p":
            return `<p>${node.getValue()}</p>`

        case "math":
            return `<!-- Support for mathematical equatations is coming soon -->`

        default: 
            return `<!-- Unsupported tag name ["${name}"] -->`
    }
}