import yargs from "yargs"
import App from "./App"
import sysPath from "path"

const args = yargs
    .scriptName("edudocs")
    .usage("$0 [args]")
    .version()
    .option("watch", {
        alias: "w",
        type: "boolean",
        default: true,
        description: "A flag which indicates if EduDocs should watch for file changes."
    })
    .option("src", {
        alias: "s",
        type: "string",
        description: "The path to the source file or directory."
    })
    .option("out", {
        alias: "o",
        type: "string",
        description: "The path to the output directory."
    })
    .option("chromium", {
        alias: "c",
        type: "string",
        description: "The path to your local chromium installation (e.g. Google Chrome). It is required to create PDF files."
    })
    .option("recursive", {
        alias: "r",
        type: "boolean",
        default: true,
        description: "A flag which indicates if EduDocs should search the input directory recursively."
    })
    .demandOption("chromium")
    .demandOption("out")
    .demandOption("src")
    .argv

async function main() {
    const makeAbsolute = (path: string) => sysPath.resolve(path)
    const app = new App(makeAbsolute(args.src), makeAbsolute(args.out), makeAbsolute(args.chromium), args.recursive, args.watch)
    app.start()
}

main()
    .catch(e => console.error(e))