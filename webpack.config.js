const path = require('path');

module.exports = {
  mode: 'development',
  entry: './tourist_manager/frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'tourist_manager/frontend/static/frontend'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
    ]
  }
};
