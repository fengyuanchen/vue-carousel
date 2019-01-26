const puppeteer = require('puppeteer');
const webpackConfig = require('./webpack.config');

process.env.CHROME_BIN = puppeteer.executablePath();
process.env.NODE_ENV = 'test';

module.exports = (config) => {
  config.set({
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    files: [
      'test/index.js',
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'test/index.js': ['webpack'],
    },
    reporters: ['mocha'],
    singleRun: true,
    webpack: {
      mode: 'production',
      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
      resolve: webpackConfig.resolve,
    },
  });
};
