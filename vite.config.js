import { defineConfig } from 'vite'
import viteBaseConfig from './config/vite.base.config.js'
import viteDevConfig from './config/vite.dev.config.js'
import viteProdConfig from './config/vite.prod.config.js'
export default defineConfig(({ command, mode }) => {
  const envResolver = {
    'serve': () => Object.assign({}, viteBaseConfig, viteDevConfig({ mode })),
    'build': () => Object.assign({}, viteBaseConfig, viteProdConfig({ mode }))
  }
  // console.log('envResolver[command]()', envResolver[command]())
  return envResolver[command]()
})
