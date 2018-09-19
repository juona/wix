const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		main: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "WiX"
		})
	],
	devServer: {
		port: 3000,
		watchOptions: {
			ignored: /node_modules/
		}
	},
	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	}
};