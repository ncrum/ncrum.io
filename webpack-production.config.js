const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/client/client.js',
    output: {
        path: path.join(__dirname, 'dist/static'),
        filename: 'bundle.js',
    },
    resolve: {
        root: [
            path.resolve('./src')
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize : true}),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: [path.join(__dirname, 'node_modules')],
            }
        ],
    },
};
