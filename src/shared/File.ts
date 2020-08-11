import path from "path"
import fs from "fs"

export default class File {

    private readonly url: string

    readonly path: string

    readonly name: string

    readonly type: string

    constructor(url: string) {
        if (!path.isAbsolute(url)) {
            throw new Error(`Path ${url} must be absolute.`)
        }

        this.url = url
        this.type = path.extname(url)
        this.name = path.basename(url)
        this.path = path.dirname(url)
    }

    get absolutePath(): string {
        return this.url
    }

    async read(): Promise<string> {
        return await fs.promises.readFile(this.absolutePath, { encoding: "utf8" })
    }

}