import xml2js from "xml2js"
import XMLNode from "./XMLNode"
import transpileXMLNode from "./transpileXMLNode"

export default async function transpileXML(xml: string) {
    const parser = new xml2js.Parser({ 
        explicitCharkey: true, 
        trim: true, 
        normalizeTags: true, 
        explicitChildren: true,
        preserveChildrenOrder: true, 
        explicitRoot: false
    })
    const dom = await parser.parseStringPromise(xml)
    const root = new XMLNode(dom)

    if (root.getName() !== "document") {
        throw new Error(`Invalid input. XML file must contain 'document' element at root level`)
    }

    return transpileXMLNode(root)
}