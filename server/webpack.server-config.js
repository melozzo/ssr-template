const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("../shared/webpack.base-config");
const nodeExternals = require("webpack-node-externals");

const webpackServerConfig = {
  // inform weback that we are building a bundle for node.js rather than for the browser
  target: "node",
  externals: [nodeExternals()],

  // tell webpack root file - entry point of server app
  entry: "./server/src/server.js",

  //where to put bundle.js ( __dirname = current working di)
  output: {
    filename: "server-bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};

module.exports = merge(baseConfig, webpackServerConfig);
