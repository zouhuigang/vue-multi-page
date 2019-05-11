'use strict'
const path = require('path')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? '/statics'
    : '/statics'

  return path.posix.join(assetsSubDirectory, _path)
}
