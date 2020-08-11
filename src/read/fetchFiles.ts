import path from "path"
import fs from "fs"
import File from "../shared/File"

export default async function fetchFiles(location: string): Promise<File[]> {
    if (!path.isAbsolute(location)) {
        throw new Error(`Source path mus be asbolute. Given: ${location}`)
    }

    const content = await fs.promises.readdir(location)
    const files: File[] = []

    for (const sub of content) {
        const url = path.join(location, sub)
        const info = await fs.promises.stat(url)

        if (info.isFile()) {
            files.push(new File(url))
        } else {
            files.push(...await fetchFiles(url))
        }
    }

    return files
}