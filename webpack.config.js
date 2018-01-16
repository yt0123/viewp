const path = require('path');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
    context: __dirname,
    entry: {
        'js/bundle': [
            path.join(__dirname, 'src/js/root.js'),
            path.join(__dirname, 'src/sass/style.scss')
        ]
    },
    output: {
        path: path.join(__dirname, 'app/'),
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {'modules': false}],
                                'react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?-url&minimize&sourceMap', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css')
    ],
};

if (process.env.NODE_ENV === 'development') {
    module.exports = merge(common, {
        devtool: 'source-map',
        plugins: [
            new WebpackNotifierPlugin({
                title: 'Webpack',
                alwaysNotify: true
            }),
        ]
    });
} else {
    module.exports = merge(common, {});
}
