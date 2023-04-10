import baseConfig from "./webpack.base.rules";

import * as webpack from "webpack";
import {rootPath, srcPath} from "./helpers/webpack.paths";
import {merge} from "webpack-merge";
import * as path from "path";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

import {dependencies as externals} from "./helpers/externals.json";

const config: webpack.Configuration = {
	target: "web",
	entry: [
		"core-js",
		"regenerator-runtime/runtime",
		path.join(srcPath, "client/index.tsx"),
	],
	mode: "production",
	output: {
		path: path.join(rootPath, "dist"),
		filename: "index.js",
		library: {
			type: "umd",
			name: "app-frontend",
		},
		globalObject: "this",
		umdNamedDefine: true,
	},

	module: {
		rules: [
			{
				test: /\.(s[ac]ss|css)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "/dist/fonts/",
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "dist/styles/[name].css",
			chunkFilename: "dist/styles/[name].css",
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: "production",
		}),
	],
	externals: [...Object.keys(externals || {})],
	performance: {
		hints: false,
	},
	devtool: false,
};

export default merge(baseConfig, config);
