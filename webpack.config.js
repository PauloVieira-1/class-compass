import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export default {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    contentScript: "./src/content/index.js",
    background: "./src/background/background.js",
    react: "./src/react/index.jsx",
  },

  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Production",
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve("manifest.json"), to: path.resolve("dist") },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: ["svg-url-loader"],
      },
      {
        test: /\.png$/,
        use: ["file-loader"],
      },
    ],
  },
};
