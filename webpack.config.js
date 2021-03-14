const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
    entry: "./Lesson_7/src/shop.js",
    output: {
        path: path.resolve(__dirname, 'Lesson_7/public/'),
        filename: "server.js"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
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
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    { loader: 'vue-loader' }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}