import ASTNode from "./ASTNode";

export default class BlockNode implements ASTNode {

    public type = "block"

    constructor(public children: ASTNode[]) {

    }

    toString(seperator: string = " ") {
        return this.children.map(child => child.toString()).join(seperator)
    }

    lines(): BlockNode[] {
        const lines: BlockNode[] = []
        let last = new BlockNode([])
        const add = () => lines.push(new BlockNode([...last.children]))

        for (const node of this.children) {
            last.children.push(node)

            if (node.type === "symbol" && node.toString().startsWith("\\\\")) {
                add()
                last.children = []
            }
        }

        add()

        return lines
    }

}