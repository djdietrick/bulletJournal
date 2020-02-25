const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.join(__dirname, './src/styles.main.scss')]
    }
  },
  devServer: {
    proxy: process.env.SERVER_URL
  }
}
