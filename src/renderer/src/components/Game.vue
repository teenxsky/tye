<template>
    <div class="game-container">
        <div v-if="isLoading" class="loading non-highlighted">
            {{ loadingText }}
        </div>
        <div class="hud">
            <div class="hud__block">
                <div class="hud__item highlighted">
                    <span>HI </span>
                    <span>{{ highScore }}</span>
                </div>
                <div class="hud__item non-highlighted">
                    <span>SC </span>
                    <span>{{ currentScore }}</span>
                </div>
            </div>
            <div class="hud__block align-right">
                <div class="hud__item">
                    <span class="highlighted">AMMO </span>
                    <span
                        class="non-highlighted"
                        :class="{ unavailable: currentAmmo === 0 }"
                        >{{ currentAmmo }}/{{ ammoAmount }}</span
                    >
                </div>
            </div>
            <div class="hud__block align-right">
                <div class="hud__item">
                    <span class="highlighted">LIVES </span>
                    <span class="non-highlighted"
                        >{{ currentLives }}/{{ livesAmount }}</span
                    >
                </div>
                <div class="hud__item">
                    <span class="highlighted">WAVE </span>
                    <span class="non-highlighted">{{ currentWave }}</span>
                </div>
            </div>
        </div>
        <div v-if="showMenu" class="menu">
            <Button
                v-for="(button, index) in menuOptions"
                :key="index"
                :isSelected="selectedButtonIndex === index"
                @select="selectButton(index)"
                @click="handleButtonClick(index)"
            >
                {{ button.label }}
            </Button>
        </div>
        <div ref="sceneContainer" class="scene-container"></div>
    </div>
</template>

<script lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { GameScene } from '@renderer/Three/GameScene.jsx'
    import {
        setMenuScene,
        setScene,
        setGameScene,
    } from '@renderer/components/Scenes'
    import {
        playSound,
        keyEnterSound,
        keySound,
    } from '@renderer/components/Audio'
    import Button from './Button.vue'

    export default {
        name: 'Game',
        components: {
            Button,
        },
        setup() {
            const sceneContainer = ref<HTMLDivElement | null>(null)
            let scene = ref<GameScene | null>(null)
            const isLoading = ref(true)
            let loadingText = ref('Loading')
            const showMenu = ref(false)

            const highScore = ref(0)
            const currentScore = ref(0)
            const currentLives = ref(3)
            const livesAmount = ref(3)
            const currentWave = ref(1)
            const currentAmmo = ref(0)
            const ammoAmount = ref(0)

            const selectedButtonIndex = ref(0)
            const options = ref([
                { label: 'RESUME', action: 'resume' },
                { label: 'QUIT', action: 'quit' },
            ])

            const initScene = () => {
                scene = new GameScene(sceneContainer.value, {
                    setLoading: setLoading,
                    setHighScore: setHighScore,
                    setCurrentScore: setCurrentScore,
                    setCurrentLives: setCurrentLives,
                    setLivesAmount: setLivesAmount,
                    setCurrentWave: setCurrentWave,
                    setCurrentAmmo: setCurrentAmmo,
                    setAmmoAmount: setAmmoAmount,
                    onGameOver: () => {
                        setMenuScene('start')
                        setScene('menu')
                    },
                })
                scene.start()
            }

            const setHighScore = (value) => {
                highScore.value = value
            }

            const setCurrentScore = (value) => {
                currentScore.value = value

                if (value > highScore.value) {
                    highScore.value = value
                }
            }

            const setCurrentLives = (value) => {
                currentLives.value = value
            }

            const setLivesAmount = (value) => {
                livesAmount.value = value
            }

            const setCurrentWave = (value) => {
                currentWave.value = value
            }

            const setCurrentAmmo = (value) => {
                currentAmmo.value = value
            }

            const setAmmoAmount = (value) => {
                ammoAmount.value = value
            }

            const setLoading = (value) => {
                isLoading.value = value

                if (value === false) {
                    setGameScene('start')
                }
            }

            const handleKeyPress = (event: KeyboardEvent) => {
                if (
                    showMenu.value &&
                    (event.key === 'ArrowUp' ||
                        event.key === 'W' ||
                        event.key === 'w' ||
                        event.key === 'Ц' ||
                        event.key === 'ц')
                ) {
                    selectedButtonIndex.value =
                        (selectedButtonIndex.value - 1 + options.value.length) %
                        options.value.length
                    playSound(keySound)
                } else if (
                    showMenu.value &&
                    (event.key === 'ArrowDown' ||
                        event.key === 'S' ||
                        event.key === 's' ||
                        event.key === 'Ы' ||
                        event.key === 'ы')
                ) {
                    selectedButtonIndex.value =
                        (selectedButtonIndex.value + 1) % options.value.length
                    playSound(keySound)
                } else if (event.key === 'Escape') {
                    if (showMenu.value) {
                        resumeGame()
                    } else {
                        showMenu.value = true
                        selectedButtonIndex.value = 0
                        scene.stop()
                    }
                    playSound(keyEnterSound)
                } else if (event.key === 'Enter') {
                    if (showMenu.value) {
                        handleButtonClick(selectedButtonIndex.value)
                        playSound(keyEnterSound)
                    }
                }
            }

            const handleButtonClick = (index: number) => {
                const action = options.value[index].action
                if (action === 'resume') {
                    resumeGame()
                } else if (action === 'quit') {
                    quitGame()
                }
            }

            const selectButton = (index: number) => {
                selectedButtonIndex.value = index
                playSound(keySound)
            }

            const resumeGame = () => {
                showMenu.value = false
                scene.start()
            }

            const quitGame = () => {
                setMenuScene('start')
                setScene('menu')
                playSound(keyEnterSound)
            }

            onMounted(() => {
                window.addEventListener('keydown', handleKeyPress)

                const loadingStates = [
                    'Loading',
                    'Loading.',
                    'Loading..',
                    'Loading...',
                ]

                let currentIndex = 0

                setInterval(() => {
                    currentIndex = (currentIndex + 1) % loadingStates.length
                    loadingText.value = loadingStates[currentIndex]
                }, 700)

                initScene()
            })

            onUnmounted(() => {
                scene.stop()
                window.removeEventListener('keydown', handleKeyPress)
            })

            return {
                sceneContainer,
                isLoading,
                showMenu,
                menuOptions: options,
                selectedButtonIndex,
                selectButton,
                handleButtonClick,
                loadingText,
                highScore,
                currentScore,
                currentLives,
                livesAmount,
                currentWave,
                currentAmmo,
                ammoAmount,
            }
        },
    }
</script>

<style>
    .game-container {
        background-color: black;
    }

    .loading {
        font-family: 'Press Start 2P';
        position: absolute;
        color: white;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        background-color: black;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        z-index: 10;
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

    .menu {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* transform: translate(-50%, -50%); */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
</style>
