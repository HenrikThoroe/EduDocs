const template: string = require("../assets/template.html")
const style: string = require("../assets/styles.css").default
const mathjax: string = require("../assets/mathjax.min.js").default

export default function build(body: string) {
    return template
        .replace("@ROOT", () => body)
        .replace("@CSS", () => `<style>${style}</style>`)
        // .replace("@JS", () => `<script>${mathjax}</script>`)
        .replace("@JS", () => `<script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg-full.js"></script>`)
}