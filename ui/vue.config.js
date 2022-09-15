const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '(/api|/meta|/login|/logout)': {
        target: 'http://localhost:8000',
        changeOrigin: false,
      },
    },
  },
})
