# Running the application

Use two terminals. Run `npm start` in the first terminal and `tsc -w` in the second terminal to start the TypeScript compiler.

# Node Version

v20.15.0

# Configuring Webpack

```powershell
npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```

- `webpack` - Plug in functionality to bundle and transform (minify) our code.
- `ts-loader` and `typescript` - Installed locally. TypeScript intalled locally means your project won't break if you use a globally different version. The TS Loader tells WebPack how to convert TS to JavaScript.
- `webpack-dev-server` - Use this to spin up a local server.