const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./shared/webpack.base-config")

const webpackServerConfig = {
  // inform weback that we are building a bundle for node.js rather than for the browser
  target: "node",

  // tell webpack root file - entry point of server app
  entry: "./server.js",

  //where to put bundle.js ( __dirname = current working di)
  output: {
    filename: "server-bundle.js",
    path: path.resolve(__dirname, "server/build")
  },

}

module.exports = merge(baseConfig, webpackServerConfig);
