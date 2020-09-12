const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index.ts',
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /\.min\.js$/,
                use: [ 'raw-loader' ]
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'edudocs.js',
        path: path.resolve(__dirname, 'dist'),
    },
};