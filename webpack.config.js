const path = require('path');

module.exports = {
  entry: './src/game/game.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
