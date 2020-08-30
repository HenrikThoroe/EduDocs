import path from "path"
import File from "./shared/File"
import puppeteer from "puppeteer"
import fs from "fs"
import transpileMD from "./transpile/transpileMD"

const p = "G:\\Projects/EduDocs/env/src/test.md"
const f = new File(p)

async function main() {
    const cnt = await f.read()
    const html = transpileMD(cnt) 
    const browser = await puppeteer.launch({ executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" })
    const page = await browser.newPage()
    await page.setViewport({ width: 4096,  height: 2160  })
    await page.setContent(html, { waitUntil: "networkidle0" })
    await page.pdf({path: 'env/hn.pdf', format: "A4", printBackground: true })
    fs.writeFileSync("G:\\Projects\\EduDocs\\env\\doc.html", html)
    await browser.close()
}

main()
    .catch(e => console.error(e))