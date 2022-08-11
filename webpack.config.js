var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/chart.jsx",
    output: {
        path: path.resolve("dist"),
        filename: "qognicafinance-react-lightweight-charts.min.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    externals: {
        react: "react"
    }
};
