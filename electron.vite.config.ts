import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        build: {
            outDir: 'out/main'
        }
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            outDir: 'out/preload'
        }
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
            }
        },
        plugins: [vue()],
        build: {
            outDir: 'out/renderer',
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        const name = assetInfo.name ?? '';
                        if (name.includes('fighters/') && 
                            (name.endsWith('.gltf') || name.endsWith('.bin'))) {
                            return name
                        }
                        return 'assets/[name]-[hash][extname]'
                    }
                }
            }
        },
        assetsInclude: [
            '**/*.gltf',
            '**/*.glb',
            '**/*.bin',
            '**/*.ttf',
            '**/*.otf',
            '**/*.mp3',
            '**/*.wav',
            '**/*.png'
        ],
        publicDir: resolve('src/renderer/src/assets')
    }
})
