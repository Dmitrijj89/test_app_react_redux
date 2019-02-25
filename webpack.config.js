const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    publicPath: '/'
  },

  devtool: "source-map",

  devServer: {
    overlay: true,
    port: 3000
  },

   module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

 
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]

};