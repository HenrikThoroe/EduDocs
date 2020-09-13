const template: string = require("../assets/template.html")
const mathjax: string = require("../assets/mathjax.min.js.txt").default
const style: string = require("../assets/styles.css").default

export default function build(body: string) {
    return template
        .replace("@ROOT", () => body)
        .replace("@CSS", () => `<style>${style}</style>`)
        .replace("@JS", () => `<script type="text/javascript">${mathjax}</script>`)
}