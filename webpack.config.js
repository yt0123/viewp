const path = require('path');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
    context: __dirname,
    entry: {
        'js/bundle': [
            path.join(__dirname, 'src/js/home/root.js'),
            path.join(__dirname, 'src/sass/home/style.scss')
        ],
        'js/bundle-source': [
            path.join(__dirname, 'src/js/source/root.js'),
            path.join(__dirname, 'src/sass/source/style.scss')
        ],
        'js/bundle-catalog': [
            path.join(__dirname, 'src/js/catalog/root.js'),
            path.join(__dirname, 'src/sass/catalog/style.scss')
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
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css').replace('bundle', 'style');
            },
            allChunks: true
        })
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
