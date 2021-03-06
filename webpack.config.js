const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = () => {
  return [
    {
      mode: production ? 'production' : 'development',
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './static/index.html',
          hash: true,
        }),
      ],
      devServer: {
        port: 3000,
      },
    },
  ];
};