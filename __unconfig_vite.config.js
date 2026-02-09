
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { NutResolver } from 'nutui-uniapp'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'
import { WeappTailwindcssDisabled } from './platform'
import postcssPlugins from './postcss.config.cjs'

// https://vitejs.dev/config/
const __unconfig_default =  defineConfig({
  // uvtw 一定要放在 uni 后面
  plugins: [
    Components({
      resolvers: [NutResolver()],
      dirs: ['src/components'],
      deep: true,
      dts: './components.d.ts'
    }),
    uni(),
    vueJsx(),
    uvtw({
      rem2rpx: true,
      disabled: WeappTailwindcssDisabled
    }),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          'nutui-uniapp/composables': [
            // 在这里添加需要自动导入的API
            'useToast'
          ]
        }
      ],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    })
  ],
  // 内联 postcss 注册 tailwindcss
  css: {
    postcss: {
      plugins: postcssPlugins
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "nutui-uniapp/styles/variables.scss";'
      }
    }
  }
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;