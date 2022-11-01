const { addBeforeLoader, assetModuleByName } = require('@craco/craco')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const shadersLoader = {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: 'asset/source'
      }

      addBeforeLoader(webpackConfig, assetModuleByName('asset/resource'), shadersLoader)

      return webpackConfig
    }
  }
}
