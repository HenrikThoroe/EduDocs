import fs from "fs"
import chokidar from "chokidar"
import puppeteer from "puppeteer"
import transpileMD from "./transpile/transpileMD"
import File from "./shared/File"
import sysPath from "path"
import { glob } from "glob"

export default class App {

    private readonly isWatching: boolean

    private readonly chromiumPath: string

    private readonly isRecursive: boolean 

    private readonly sourcePath: string

    private outDirectory: string

    private sourceDirectory: string

    private watcher: chokidar.FSWatcher

    private browser?: puppeteer.Browser

    private automaticallyCreateDirectories = false

    constructor(source: string, out: string, chromium: string, recursive: boolean, watchMode: boolean) {
        this.handleFileUpdate = this.handleFileUpdate.bind(this)
        this.handleFileUnlink = this.handleFileUnlink.bind(this)
        this.handleDirectoryAdd = this.handleDirectoryAdd.bind(this)
        this.handleDirectoryUnlink = this.handleDirectoryUnlink.bind(this)

        this.sourcePath = source
        this.isRecursive = recursive
        this.isWatching = watchMode
        this.chromiumPath = chromium
        this.outDirectory = out
        this.sourceDirectory = App.getDirectory(source)

        if (!App.validateOutDirectory(out)) {
            throw new Error(`Invalid output directory: ${out}`)
        }

        if (!App.validateChromium(chromium)) {
            throw new Error(`Invalid path name for chromium instance: ${chromium}`)
        }
    }

    start() {
        if (this.isWatching) {
            this.watcher = chokidar.watch(this.sourcePath, {
                ignoreInitial: false,
                depth: this.isRecursive ? 99 : 0
            })
    
            this.watcher.on("change", this.handleFileUpdate)
            this.watcher.on("add", this.handleFileUpdate)
            this.watcher.on("unlink", this.handleFileUnlink)
            this.watcher.on("addDir", this.handleDirectoryAdd)
            this.watcher.on("unlinkDir", this.handleDirectoryUnlink)
        } else {
            this.automaticallyCreateDirectories = true
            this.iterateSources()
                .then(() => this.browser?.close())
                .catch(e => console.error(e))
        }
    }

    private async iterateSources() {
        const normalized = sysPath.normalize(this.sourceDirectory)

        return new Promise<void>((res, rej) => {
            glob(`${normalized}/**/*.md`, async (err, files) => {
                for (const file of files) {
                    await this.handleFileUpdate(file)
                }

                res()
            })
        })
    }

    private async handleDirectoryAdd(dir: string) {
        const outDir = this.outPath(dir)
        if (!await App.exists(outDir)) {
            await App.mkdir(outDir)
        }
    }

    private async handleDirectoryUnlink(dir: string) {
        const outDir = this.outPath(dir)
        await App.sleep(2000)
        if (await App.exists(outDir)) {
            await App.rmdir(outDir)
        }
    }
    
    private async handleFileUpdate(path: string) {
        const file = new File(path)

        if (file.type !== "md") {
            return
        }

        const md = await file.read()
        const html = transpileMD(md)
        const out = this.outPath(path)

        if (this.automaticallyCreateDirectories) {
            const dir = sysPath.dirname(out)

            if (!await App.exists(dir)) {
                await App.mkdir(dir)
            }
        }

        await this.createPDF(html, this.outPath(path))
    }

    private async handleFileUnlink(path: string) {
        const out = this.outPath(path)
        await App.unlink(out)
    }

    private outPath(sourecPath: string): string {
        const n = sysPath.normalize(sourecPath)
        const n1 = sysPath.normalize(this.sourceDirectory)
        const n2 = sysPath.normalize(this.outDirectory)
        const out = n.replace(n1, n2).replace(".md", ".pdf")

        return out
    }

    private async createPDF(html: string, path: string) {
        await this.prepare()
        const page = await this.browser!.newPage()

        await page.setViewport({ width: 1080,  height: 1920  })
        await page.setContent(html, { waitUntil: "networkidle0" })
        await page.emulateMediaType("screen")
        await page.pdf({ path: path, format: "A4", printBackground: true })
    }

    private async prepare() {
        if (this.browser === undefined) {
            this.browser = await puppeteer.launch({ executablePath: this.chromiumPath })
        }
    }

    private async terminate() {
        await this.watcher.close()
        await this.browser?.close()
    }

    private static validateChromium(path: string): boolean {
        return fs.existsSync(path)
    }

    private static validateOutDirectory(path: string): boolean {
        return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
    }

    private static getDirectory(path: string) {
        if (!fs.existsSync(path)) {
            throw new Error(`Path does not exist: ${path}`)
        }

        const state = fs.lstatSync(path)

        if (state.isDirectory()) {
            return path
        }

        return sysPath.dirname(path)
    }

    private static async exists(path: string) {
        return new Promise<boolean>((res, rej) => fs.access(path, fs.constants.F_OK, err => err ? res(false) : res(true)))
    }

    private static async unlink(path: string) {
        return new Promise<void>((res, rej) => fs.unlink(path, err => err ? rej(err) : res()))
    }

    private static async rmdir(path: string) {
        return new Promise<void>((res, rej) => fs.rmdir(path, err => err ? rej(err) : res()))
    }

    private static async mkdir(path: string, recursive: boolean = true) {
        return new Promise<void>((res, rej) => fs.mkdir(path, { recursive: recursive }, err => err ? rej(err) : res()))
    }

    private static async sleep(ms: number) {
        return new Promise<void>((res, rej) => setTimeout(() => res(), ms))
    }

}