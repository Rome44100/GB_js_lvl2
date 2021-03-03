const path = require("path");

module.exports = {
    entry: "./Lesson_5/js/shop.js",
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: "main.js"
    }
}