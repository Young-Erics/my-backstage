import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  return {
    build: {
      // 配置rollup
      rollupOptions: {
        // 控制输出
        output: {
          // 静态资源打包到dist下的不同目录
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: id => {
            // id表示打包后的资源文件目录，string
            if (id.includes('node_modules')) {
              // 表示将node_module中的文件单独打包并且命名为vendors，打包后的文件名不会变更,浏览器就会请求缓存的资源，不会再次重新发出请求新的资源
              return 'vendors'
            }
          }
        }
      },
      assetsInlineLimit: 1024000, //以B为单位，这里是1MB以下的图片会转换为base64
      outDir: 'my-backstage-dist', //输出的打包文件夹名字
      assetsDir: 'static', //设置静态资源文件夹名字
      emptyOutDir: true, //清楚打包输出目录中的文件，默认就为true,vite天生支持
      // 规定触发警告的 chunk 大小，消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000
    },
    // 打包去除 console debugger
    esbuild: {
      pure: viteEnv.VITE_APP_ENV === 'production' ? ['console.log', 'debugger'] : []
    }
  }
})
