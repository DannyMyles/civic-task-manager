// webpack.config.js
const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!etag|fs)/,
                use: 'babel-loader',
            }
        ]
    },
    externals: [nodeExternals()],
    resolve: {
        fallback: {
            "querystring": require.resolve("querystring-es3"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer"),
            "fs": false,
            "path": require.resolve("path-browserify"),
            "url": require.resolve("url"),
            "util": require.resolve("util"),
            "assert": require.resolve("assert"),
            "async_hooks": require.resolve('async_hooks'),
            "crypto": require.resolve('crypto-browserify'),
            "net": require.resolve('net'),
            "zlib": require.resolve('browserify-zlib'),
        }
    }
};