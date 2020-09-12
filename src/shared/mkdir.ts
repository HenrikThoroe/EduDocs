import fs from "fs"

export default async function mkdir(path: string, recursive: boolean = true) {
    return new Promise<void>((res, rej) => fs.mkdir(path, { recursive: recursive }, err => err ? rej(err) : res()))
}