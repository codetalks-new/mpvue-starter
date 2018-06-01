var utils = require('./utils')
var config = require('../config')
// var isProduction = process.env.NODE_ENV === 'production'
// for mp
var isProduction = true

const loaders = utils.cssLoaders({
  sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
  extract: isProduction
})
// currently didn't work with ts-loader and awesome-typescript-loader 5.0
const tsLoaders = {
  ts: ['babel-loader', 'awesome-typescript-loader']
}

Object.assign(loaders, tsLoaders)

module.exports = {
  loaders: loaders,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
