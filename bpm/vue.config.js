// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack:{
//     devtool: 'source-map'
//   }
// })

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.svg$/, // Apply this rule to .svg files
          use: [
            {
              loader: 'vue-svg-loader' // Use vue-svg-loader for these files
            }
          ]
        }
      ]
    }
  }
});
