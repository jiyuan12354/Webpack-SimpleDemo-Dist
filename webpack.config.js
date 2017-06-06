var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/scripts/index.js']
    },

    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js'
    },

    module: {
		rules: [
			{
				test: /\.html$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: [
					"html-loader"
				]
			},
			{
				test: /\.js$/,
                include: path.join(__dirname, 'src'),
				exclude: path.resolve(__dirname, 'node_modules'),
				use: [
					"babel-loader"
				]
			},
			{
				test: /\.css$/,
                include: path.join(__dirname, 'src/scss'),
				loaders: [
					'style-loader',
					'css-loader?importLoaders=1'				]
			},
            {
				test: /\.scss$/,
                include: path.join(__dirname, 'src/scss'),
				loaders: [
					'style-loader',
					'css-loader?importLoaders=1',
                    'sass-loader'			
                    ]
			}
		],
	},
    plugins: [
		new htmlWebpackPlugin({
			filename:'index.html',
			template: './index.html',
			chunks:['app']
		}),

		new OpenBrowserPlugin({
          url: 'http://localhost:8088'
        }),
    ],
	devServer: {
		port: 8088,
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转

    }
};
