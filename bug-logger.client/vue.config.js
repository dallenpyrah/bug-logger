module.exports = {
  // NOTE to host on github publicPath: '/YOUR-GITHUB-REPOSITORY-NAME/',
  publicPath: '/',
  outputDir: 'root',
  productionSourceMap: false,
  devServer: { https: false }
}

// In this file make sure the output dir is root and the public path is blank for heroku deploys
