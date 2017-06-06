var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: ['./src/scripts/index']
    },

    output: {
        path: __dirname + "/dist",
        filename: 'bundle.[hash].js',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
			filename: 'index.aspx',
			template: 'index.html',
			inject: 'body',
			chunks: ['app'],
			minify: {
				removeComments: true,
				//collapseWhitespace: true
			}
		})
    ]
};
