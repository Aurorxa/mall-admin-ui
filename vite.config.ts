import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import Inspect from 'vite-plugin-inspect'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import {presetIcons} from 'unocss'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')
    return {
        base: env.VITE_APP_BUILD_DIRECTORY,
        plugins: [
            vue({reactivityTransform: true}),
            vueJsx(),
            legacy({
                targets: ['defaults', 'not IE 11']
            }),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'],
                dirs: [path.resolve(__dirname, 'src', 'composables')],
                resolvers: [
                    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                    ElementPlusResolver(),
                    // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon',
                    }),

                ],
                vueTemplate: true,
                dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'),
            }),
            Components({
                resolvers: [
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver(),
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                ],
                dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts'),
            }),
            Icons({
                autoInstall: true,
            }),
            Inspect(),
            // 添加以下配置
            Unocss({
                presets: [
                    presetIcons({
                        scale: 1.2,
                        warn: true
                    }),
                ],
                // 以下配置是为了可以直接使用标签 <i-ep-edit />
                variants: [
                    {
                        match: (s) => {
                            if (s.startsWith('i-')) {
                                return {
                                    matcher: s,
                                    selector: (s) => {
                                        return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                                    },
                                }
                            }
                        },
                    },
                ],
            }),
            WindiCSS()
        ],
        resolve: {
            alias: [ // 配置别名
                {find: '@', replacement: path.resolve(__dirname, 'src')}
            ],
        },
        build: {
            target: 'es2015'
        },
        server: { // 解决 "vite use '--host' to expose"
            host: '0.0.0.0',
            port: 8080,
            open: true,
            proxy: {
                // 选项写法
                "/api": {
                    target: "http://localhost:8088", // 所要代理的目标地址
                    rewrite: (path) => path.replace(/^\/api/, ""),
                    changeOrigin: true
                }
            }
        }
    }
})

