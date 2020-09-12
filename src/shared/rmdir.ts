import fs from "fs"

export default async function rmdir(path: string) {
    return new Promise<void>((res, rej) => fs.rmdir(path, err => err ? rej(err) : res()))
}