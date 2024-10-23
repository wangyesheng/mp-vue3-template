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
export default defineConfig({
  // uvtw 一定要放在 uni 后面
  plugins: [
    Components({
      resolvers: [NutResolver()]
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
