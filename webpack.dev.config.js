const { merge } = require("webpack-merge");
const base = require("./webpack.config");

module.exports = merge(base, {
    devServer: {
        contentBase: "./Lesson_5",
        publicPath: "/public",
        host: "localhost",
        port: 8080,
        hot: true
    }
});