const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   plugins: [
    new CopyPlugin([
      { from: 'src/app/assets/games', to: 'dist/assets/games' },
    ]),
  ],
};
