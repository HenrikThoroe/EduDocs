export interface XMLNodeAttribute {
    key: string
    value: string
}

export default class XMLNode {

    private obj: any

    private name: string

    private value: string = ""

    private attributes: XMLNodeAttribute[] = []

    private children: XMLNode[] = []

    constructor(object: any) {
        this.obj = object
        this.parseAttributes()
        this.parseChildren()
        this.parseName()
        this.parseValue()
    }

    private parseValue() {
        const val = this.obj["_"] as string

        if (val) {
            this.value = val
        }
    }

    private parseName() {
        const name = this.obj["#name"] as string

        if (name) {
            this.name = name
        }
    }

    private parseAttributes() {
        const attrs = this.obj["$"]

        if (attrs) {
            for (const key in attrs) {
                this.attributes.push({ key: key, value: attrs[key] })
            }
        }
    }

    private parseChildren() {
        const children = this.obj["$$"] as any[]

        if (children) {
            for (const child of children) {
                this.children.push(new XMLNode(child))
            }
        }
    }

    getValue(): string {
        return this.value
    }

    getAttributes(): XMLNodeAttribute[] {
        return this.attributes
    }

    getName(): string {
        return this.name
    }

    getChildren(): XMLNode[] {
        return this.children
    }

}