# EduDocs

EduDocs is a command line application which translates markdown files to PDF. But that's not all! EduDocs interprets all code sections of your markdown files as LaTeX and converts it to beautiful math eqautions. 
Perfect for your math classes! Last but defnautly not least EduDocs provides a nice wrapper around your LaTeX code to make your life a lot easier. For example you can simply write `vec(x) = matrix(a b c)` instead 
of `\vec{x} = \begin{pmatrix} a \\ b \\ c \end{pmatrix}`. 

## Installation 

EduDocs can be downloaded as JavaScript file or as native binary. The first option has the benefit that the file is very small, but requires that NodeJS is installed on your machine.
If this is not the case simply download the binary for your architecture (Mac, Windows, Linux). Both, the JS file and the binaries can be found on GitHub releases or on my website.

## Usage 

EduDocs requires a local Chromium installation (e.g. Google Chrome) to work properly. Please install it first. 

```sh
node /path/to/edudocs.js --src /path/to/source/directory/or/file --out /path/to/out/directory -chromium /path/to/chrome.exe --watch --recursive

# or

/path/to/edudocs.exe --src /path/to/source/directory/or/file --out /path/to/out/directory -chromium /path/to/chrome.exe --watch --recursive
```

| flag | shortcut | expected value | description |
| ---- | -------- | -------------- | ----------- |
| --src | -s | string | The path to the source file or directory. |
| --out | -o | string | The path to the output directory. |
| --chromium | -c | string | The path to your local chromium installation (e.g. Google Chrome). It is required to create PDF files. |
| --watch | -w | boolean | A flag which indicates if EduDocs should watch for file changes. |
| --recursive | -r | boolean | A flag which indicates if EduDocs should search the input directory recursively. |