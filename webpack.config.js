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
            oneOf: [
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                ],
              },
              {
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                loader: require.resolve('file-loader'),
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
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