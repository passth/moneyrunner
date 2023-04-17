/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./frontend/index.tsx",
  output: {
    path: path.join(__dirname, "./dist/backend/public/"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.frontend.json",
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
        generator: {
          filename: "stylesheets/[name][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|json)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: `assets/[name][ext][query]`,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      components: path.resolve(__dirname, "./frontend/components/"),
      services: path.resolve(__dirname, "./frontend/services/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/index.html",
      sdkUrl: process.env.PASSTHROUGH_SDK_URL,
    }),
  ],
};
