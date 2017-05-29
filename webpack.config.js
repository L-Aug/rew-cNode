var webpack = require("webpack");
module.exports = {
	entry: __dirname + "/main.js",
	output:{
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	resolve:{
		alias:{
			vue:'vue/dist/vue.js'
		}
	},
	module: {
		loaders: [{
			//cnpm install babel-loader
			//npm install --save-dev babel-core babel-preset-es2015 //安装babel  实现 ES6 到 ES5
			test: /\.js$/ ,
			loader: "babel-loader"
		},{
			//cnpm install html-loader
			test: /\.html$/ ,
			loader: "html-loader"
		},{
			//cnpm install vue-loader vue-template-compiler
			test: /\.vue$/ ,
			loader: "vue-loader"
		}, {
			//cnpm install css-loader style-loader
			test: /\.css$/,
			loader: "style-loader!css-loader"
		},{
			//cnpm install sass-loader node-sass
			test: /\.scss$/ ,
			loader: "sass-loader"
		}, {
			//cnpm install less-loader less
			test: /\.less$/,
			loader: "less-loader"
		},{
			//npm install url-loader --save-dev
			test: /\.(jpg|png|gif|jpeg)$/,
			loader: "url-loader"
		},{
			//cnpm install file-loader
			test: /\.(ttf|svg|woff|eot)$/,
			loader: "file-loader"
		},{
      test: require.resolve('zepto'),
      loader: 'exports-loader?window.Zepto!script-loader'
    }]
	},
	
//	devServer:{
//		contentBase:'./public',
//		inline:true
//	},
	plugins: [
		//代码压缩
//		new webpack.optimize.UglifyJsPlugin()
		 new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
	]
}
