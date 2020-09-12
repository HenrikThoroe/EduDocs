import fs from "fs"

export default async function unlink(path: string) {
    return new Promise<void>((res, rej) => fs.unlink(path, err => err ? rej(err) : res()))
}