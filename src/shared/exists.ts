import fs from "fs"

export default async function exists(path: string) {
    return new Promise<boolean>((res, rej) => fs.access(path, fs.constants.F_OK, err => err ? res(false) : res(true)))
}