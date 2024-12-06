<template>
    <div>
        <h2>HUD</h2>
    </div>
    <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { GameScene } from '@renderer/Three/GameScene.jsx'
    import { setMenuScene, setScene } from '@renderer/components/Scenes'
    import { playSound, keyEnterSound } from '@renderer/components/Audio'

    export default {
        name: 'Game',
        setup() {
            const sceneContainer = ref<HTMLDivElement | null>(null)

            const initScene = () => {
                const scene = new GameScene(sceneContainer.value)
                scene.start()
            }

            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setMenuScene('start')
                    setScene('menu')
                    playSound(keyEnterSound)
                }
            }

            onMounted(() => {
                window.addEventListener('keydown', handleKeyPress)
                initScene()
            })

            onUnmounted(() => {
                window.removeEventListener('keydown', handleKeyPress)
            })

            return {
                sceneContainer,
            }
        },
    }
</script>

<style>
    h1 {
        color: red;
    }
</style>
