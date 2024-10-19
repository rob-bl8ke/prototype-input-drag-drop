const path = require("path");

module.exports = {
    mode: 'development',
    // specify the entry file and the bundled output file
    // use node.js path handling/resolving features
    entry: "./src/app.ts",
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
    },
    // webpack support for debugging... ensure "sourceMap": true in tsconfig.js
    devtool: "inline-source-map",
    // tell webpack how to deal with typescript
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    // tell webpack what to look for in imports
    // basically, this means you can remove "*.js" from your ES module import statements
    resolve: {
        extensions: [".ts", ".js"],
    },
};
