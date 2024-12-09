<template>
    <div v-if="isLoading" class="loading non-highlighted">Loading...</div>
    <div class="hud">
        <div class="hud__block">
            <div class="hud__item highlighted">
                <span>HI </span>
                <span>0</span>
            </div>
            <div class="hud__item non-highlighted">
                <span>SC </span>
                <span>0</span>
            </div>
        </div>
        <div class="hud__block align-right highlighted">
            <div class="hud__item">
                <span>LIVES </span>
                <span>2/3</span>
            </div>
            <div class="hud__item highlighted">
                <span>NITRO </span>
                <span>0</span>
            </div>
        </div>
    </div>
    <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { GameScene } from '@renderer/Three/GameScene.jsx'
    import {
        setMenuScene,
        setScene,
        setGameScene,
    } from '@renderer/components/Scenes'
    import { playSound, keyEnterSound } from '@renderer/components/Audio'

    export default {
        name: 'Game',
        setup() {
            const sceneContainer = ref<HTMLDivElement | null>(null)
            let scene = ref<GameScene | null>(null)
            const isLoading = ref(true)

            const initScene = () => {
                scene = new GameScene(sceneContainer.value, {
                    setLoading: setLoading,
                    onGameOver: () => {
                        setMenuScene('start')
                        setScene('menu')
                    },
                })
                scene.start()
            }

            const setLoading = (value) => {
                isLoading.value = value

                if (value === false) {
                    setGameScene('start')
                }
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
                scene.stop()
                window.removeEventListener('keydown', handleKeyPress)
            })

            return {
                sceneContainer,
                isLoading,
            }
        },
    }
</script>

<style>
    .loading {
        position: absolute;
        color: white;
        top: 50%;
        left: 50%;
        font-size: 3rem;
        font-family: 'Press Start 2P';
        transform: translate(-50%, -50%);
    }

    .hud {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 12rem;
        align-items: center;
        justify-content: space-between;
        padding: 0 3rem 0 3rem;
        color: white;
        /* border-top: 1px solid white; */
        background-color: black;
        font-size: 3rem;
        font-family: 'Press Start 2P';
    }

    .hud__block {
        display: flex;
        flex-direction: column;
    }

    .hud__item {
        margin-bottom: 1rem;
    }

    .align-right {
        text-align: right;
    }

    .align-center {
        text-align: center;
    }
</style>
