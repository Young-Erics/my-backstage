import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  // console.log('viteEnv.VITE_BASE_SERVER_URL', viteEnv)
  return {
    server: {
      host: '0.0.0.0',
      port: 8181,
      open: true,
      // 端口占用直接退出
      strictPort: false,
      // openPage: 'http://172.16.116.245:8080',
      // 本地服务 CORS 是否开启
      cors: true,
      proxy: {
        [viteEnv.VITE_BASE_API]: {
          target: viteEnv.VITE_BASE_SERVER_URL,
          // 允许跨域
          changeOrigin: true
          // secure: true,
          // rewrite: path => path.replace(viteEnv.VITE_BASE_API, '/')
        }
      }
    }
  }
})
