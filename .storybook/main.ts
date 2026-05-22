import { fileURLToPath, URL } from 'url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

const tmaster = fileURLToPath(new URL('../../hdot-tmaster-front', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins ?? []),
      vue(),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          'vue-i18n',
          {
            '#app': ['navigateTo', 'useNuxtApp', 'useRuntimeConfig'],
          },
        ],
        dirs: [`${tmaster}/stores`, `${tmaster}/composables`, `${tmaster}/services`],
        dts: false,
      }),
    ]
    config.resolve ??= {}
    config.resolve.alias = {
      ...((config.resolve.alias as Record<string, string>) ?? {}),
      '@': tmaster,
      '~': tmaster,
      'hdot-tmaster-front': tmaster,
      '#app': fileURLToPath(new URL('./nuxt-mock.ts', import.meta.url)),
    }
    // hdot-tmaster-front 컴포넌트가 참조하는 공유 패키지는
    // hd-oilterminal의 node_modules에서 단일 버전으로 resolve
    config.resolve.dedupe = ['vue', 'pinia', 'vue-i18n', 'realgrid']
    return config
  },
}

export default config
