const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");


const browserConfig = {
  mode: "production",
  entry: "./app/src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
		{	
			test: /\.(js)$/, 
			use: "babel-loader",
			
	},
      { test: /\.css$/, use: ["css-loader"] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
  ],
};

const serverConfig = {
  mode: "production",
  entry: "./server/src/server.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "server/build"),
    filename: "server-bundle.js",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
 
    ],
  },
  plugins: [
  
    new webpack.DefinePlugin({
      __isBrowser__: "false",
    }),
  ],
};

module.exports = [browserConfig, serverConfig];