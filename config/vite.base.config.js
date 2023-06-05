import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
// 开启按需加载及自动导入
import AutoImport from 'unplugin-auto-import/vite' //API自动引入插件
import Components from 'unplugin-vue-components/vite' // 组件自动引入插件
// 插件内置的解析器,像常用的组件库（element、antd 等）自动引入的一些配置都被内置了
// VueUseComponentsResolver 是VueUse 的解析器
import { ElementPlusResolver, ArcoResolver, VueUseComponentsResolver, VueUseDirectiveResolver } from 'unplugin-vue-components/resolvers'
// icon 插件,基于 iconify(https://icones.js.org/) 图标库支持按需访问上万种图标,
import Icons from 'unplugin-icons/vite'
// icon 自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
// 从文件中加载图标的加载器
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import cdnImport from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url))
    }
  },
  //对css的行为进行配置
  css: {
    // modules中的配置最终都会交给postcss modules来处理
    modules: {
      //对css模块化进行配置
      localsConvention: 'camelCaseOnly', //修改cssmodule生成的配置对象的key的展示形式，驼峰or中划线形式
      generateScopedName: '[name]_[local]_[hash:5]' //修改生成类名的规则，name表示模块名-module,local表示css类名
    },
    devSourcemap: true //默认为false，能够直接定位到源代码，而不是压缩后的代码
  },
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 9']
    }),
    AutoImport({
      // 需要去解析的文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      // imports 指定自动引入API的包名
      imports: ['vue', 'vue-router', '@vueuse/core', 'vuex'],
      // 生成相应的自动导入json文件。
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ArcoResolver(),
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver()
      ]
    }),
    Components({
      // imports 指定组件所在目录，默认为 src/components
      dirs: ['../src/components/', '../src/views/'],
      // 需要去解析的文件
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      resolvers: [
        ArcoResolver({
          sideEffect: true
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
        // 自动引入解析器
        IconsResolver({
          // icon组件前缀 - 为了统一组件icon组件名称格式,设置为false则没有前缀
          prefix: 'Icon',
          // 自定义的icon模块集合
          customCollections: ['user', 'home', 'system'],
          // enabledCollections: ['ep'] // 默认支持Iconify所有的图标集
          // 别名
          alias: {
            park: 'icon-park'
          }
        })
      ]
    }),
    // Icon 插件配置
    Icons({
      compiler: 'vue3',
      customCollections: {
        // user图标集，给svg文件设置 fill="currentColor" 属性，使图标的颜色具有适应性
        user: FileSystemIconLoader('src/assets/svg/user', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        // home 模块图标集
        home: FileSystemIconLoader('src/assets/svg/home', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        system: FileSystemIconLoader('src/assets/svg/system')
      },
      autoInstall: true
    }),
    cdnImport({
      modules: [
        {
          name: 'lodash',
          var: '_',
          path: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://cdn.jsdelivr.net/npm/axios@1.2.0/dist/axios.min.js'
        }
        // {
        //   name: '@vueuse/core',
        //   var: 'VueUse',
        //   path: 'https://cdn.jsdelivr.net/npm/@vueuse/core@9.5.0/index.iife.min.js'
        // }
      ]
    }),
    viteCompression({
      threshold: 512000
    })
  ]
})
