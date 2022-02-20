
module.exports = {

	mode: "development", // "production" | "development" | "none"

	module: {
		rules: [{
			test: /\.js?$/,
			loader: "babel-loader",
			exclude: /node_modules/,
			options: {
				presets: [
					'@babel/preset-env', '@babel/preset-react'
				],
			},
		}],
	},
};