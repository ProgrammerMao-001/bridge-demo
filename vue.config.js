const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(gltf)$/,
          loader: 'url-loader'
        }
      ],
    },
  },
})
