const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("../shared/webpack.base-config")

const  webpackAppConfig = {

  // tell webpack root file - entry point of server app
  entry: "./app/src/app.js",

  //where to put bundle.js ( __dirname = current working di)
  output: {
    filename: "app-bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  // tell webpack to use bable to convert to es2015
 
};

module.exports = merge(baseConfig, webpackAppConfig);