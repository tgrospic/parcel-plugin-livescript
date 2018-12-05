//
// ls2.js - Transpile LiveScript to JavaScript
//
const livescript = require('livescript')
const { Asset } = require('parcel-bundler')

module.exports = class LiveScriptAsset extends Asset {
  constructor(name, options) {
    super(name, options)
    this.type = 'js'
  }

  async generate () {
    // Compile
    const transpiled = livescript.compile(this.contents, {
      bare: true,
      filename: this.relativeName,
      map: this.options.sourceMaps,
    })

    // Generate source map
    const generate = () => {
      const sm = transpiled.map.toJSON()
      sm.sources = [this.relativeName]
      sm.sourcesContent = [this.contents]
      return sm
    }
    const sourceMap = transpiled.map && generate()

    return [{
      type: 'js',
      value: transpiled.code,
      sourceMap,
    }]
  }
}
