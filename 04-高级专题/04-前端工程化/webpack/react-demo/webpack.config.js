//引入指定plugin模块
const HtmlWebpackPlugin = require("html-webpack-plugin"); //处理html文档
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; //分析器插件
//引入涉及路径操作的模块
const path = require("path");
//引入webpack模块（本处用于热更新）
const webpack = require("webpack");
//引入用于压缩文件的模块
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  //配置文件压缩
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 使用缓存
        parallel: true, // 使用多线程
        terserOptions: {
          compress: {
            //删除无用的代码
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          },
        },
      }),
    ],
  },
  //指定入口文件
  entry: path.resolve(__dirname, "src/index.jsx"),
  //配置loader
  module: {
    //定义规则列表
    rules: [
      {
        //指定待转义文件: .js .jsx
        test: /\.jsx?$/,
        //指定不转义文件：三方代码等
        exclude: /node_modules/,
        //指定使用的加载器
        use: {
          loader: "babel-loader",
          //引入规则
          options: {
            babelrc: false, //不适用.babelrc配置文件
            //指定规则
            presets: [
              //转义jsx规则
              require.resolve("@babel/preset-react"),
              //转义es6规则，第二个参数指定模块化方案（是否编译import代码）
              [require.resolve("@babel/preset-env", { module: false })],
            ],
            //缓存编译结果
            cacheDirectory: true,
          },
        },
      },
    ],
    //不解析非模块相关文件（优化性能）
    noParse: /node_modules\/(jquery\.js)/,//不解析jquery
  },
  //配置plugin(数组形式：可以有多个)
  plugins: [
    //实例化引入的plugin
    //用于处理html文件
    new HtmlWebpackPlugin({
      //参数：被处理文件的路径
      template: path.resolve(__dirname, "src/index.html"),
      //参数：输出的文件名
      filename: "index.html",
    }),
    //用于热更新
    new webpack.HotModuleReplacementPlugin(),
    //压缩分析器插件
    new BundleAnalyzerPlugin(),
  ],
  //省略文件后缀
  resolve: {
    extensions: [".js", ".jsx", "json"],
  },
  //配置服务启动
  devServer: {
    port: 3000,
    hot: true,
  },
};
