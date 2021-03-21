const path = require("path");

module.exports = {
    entry: "./Lesson_5/js/shop.js",
    output: {
        path: path.resolve(__dirname, 'Lesson_5/public/'),
        filename: "server.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: "babel-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
}