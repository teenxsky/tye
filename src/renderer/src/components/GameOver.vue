<template>
    <div class="game-over-container" @focus="false">
        <div class="game-over-content">
            <div v-if="isLoading" class="loading non-highlighted">
                {{ loadingText }}
            </div>
            <template v-else>
                <h1 class="title">GAME OVER</h1>

                <p v-if="showUsernameInput" class="new-record">
                    YOU BEATED THE WORLD RECORD!
                </p>
                <p v-else-if="isNewHighScore" class="new-record">
                    NEW HIGH SCORE!
                </p>

                <div class="scores">
                    <p class="score">YOUR SCORE: {{ currentScore }}</p>
                    <p class="high-score">HIGH SCORE: {{ highScore }}</p>
                </div>

                <div v-if="showUsernameInput" class="username-section">
                    <div class="input-container">
                        <Button>
                            <input
                                v-model="username"
                                :class="{ error: showError }"
                                placeholder="ENTER YOUR USERNAME"
                                maxlength="20"
                                ref="usernameInput"
                                :disabled="false"
                                autofocus
                            />
                        </Button>
                        <p v-if="showError" class="error-message">
                            {{ errorMessage }}
                        </p>
                    </div>
                    <!-- <Button class="submit-btn":isSelected="selectedIndex === 1">
                        SUBMIT
                    </Button> -->
                </div>

                <div v-if="showSuccess" class="success-message">
                    <p>SUCCESS!</p>
                </div>

                <!-- <div v-if="showConnectionError" class="connection-error">
                    <p>CONNECTION ERROR</p>
                    <p class="subtitle">SCORE WILL BE SAVED LOCALLY</p>
                </div> -->

                <p v-if="!showUsernameInput" class="press-key">
                    PRESS ESC TO CONTINUE
                </p>
                <p v-else-if="showUsernameInput" class="press-key">
                    PRESS ENTER TO SUBMIT
                </p>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import Button from '@renderer/components/Button.vue'
    import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
    import {
        isTopScore,
        usernameIsUnique,
        setScore,
    } from '../../../../server/api/LeaderBoard'
    import {
        playSound,
        keySound,
        keyEnterSound,
        stopAllThemes,
        highScoreBeatedTheme,
        gameOverTheme,
    } from '@renderer/components/Audio'
    import { setMenuScene, setScene } from '@renderer/components/Scenes'

    export default defineComponent({
        name: 'GameOver',
        components: {
            Button,
        },
        props: {
            currentScore: {
                type: Number,
                required: true,
            },
            highScore: {
                type: Number,
                required: true,
            },
            isNewHighScore: {
                type: Boolean,
                required: true,
            },
        },
        setup(props) {
            const username = ref('')
            const showUsernameInput = ref(false)
            const showError = ref(false)
            const errorMessage = ref('')
            const showSuccess = ref(false)
            const showConnectionError = ref(false)
            const isLoading = ref(true)
            const isSubmitting = ref(false)
            const loadingText = ref('Loading')
            const selectedIndex = ref(0)
            const isInputMode = ref(true)
            const usernameInput = ref<HTMLInputElement | null>(null)

            const handleKeyEvents = (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    if (isInputMode.value) {
                        isInputMode.value = false
                        if (usernameInput.value) {
                            usernameInput.value.disabled = true
                            usernameInput.value.autofocus = false
                            usernameInput.value.blur()
                        }
                        submitUsername()
                        playSound(keyEnterSound)
                        event.preventDefault()
                    } else {
                        isInputMode.value = true
                        event.preventDefault()
                    }
                    return
                }

                if (isInputMode.value) {
                    return
                }

                switch (event.key) {
                    case 'Escape':
                        setMenuScene('start')
                        setScene('menu')
                        playSound(keyEnterSound)
                        break

                    case 'ArrowUp':
                    case 'W':
                    case 'w':
                    case 'Ц':
                    case 'ц':
                        selectedIndex.value = (selectedIndex.value - 1 + 2) % 2
                        playSound(keySound)
                        break

                    case 'ArrowDown':
                    case 'S':
                    case 's':
                    case 'Ы':
                    case 'ы':
                        selectedIndex.value = (selectedIndex.value + 1) % 2
                        playSound(keySound)
                        break
                }
            }

            const handleKeyDown = handleKeyEvents
            const handleKeyPress = handleKeyEvents

            const submitUsername = async () => {
                if (!username.value.trim()) {
                    showError.value = true
                    errorMessage.value = 'NAME CANNOT BE EMPTY'
                    return
                }

                isSubmitting.value = true

                const isUnique = await usernameIsUnique(username.value)

                if (isUnique === null) {
                    showConnectionError.value = true
                    isSubmitting.value = false
                    return
                }

                if (!isUnique) {
                    showError.value = true
                    errorMessage.value = 'NAME ALREADY EXISTS'
                    isSubmitting.value = false
                    return
                }

                const success = await setScore(
                    username.value,
                    props.currentScore
                )

                if (success === null) {
                    showConnectionError.value = true
                    isSubmitting.value = false
                    return
                }

                if (success) {
                    showUsernameInput.value = false
                    showSuccess.value = true
                }
                isSubmitting.value = false
            }

            const checkTopScore = async () => {
                if (props.isNewHighScore) {
                    const isTop = await isTopScore(props.currentScore)
                    if (isTop === null) {
                        showConnectionError.value = true
                    } else if (isTop) {
                        showUsernameInput.value = true
                    }
                }
                isLoading.value = false
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

                const loadingInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % loadingStates.length
                    loadingText.value = loadingStates[currentIndex]
                }, 700)

                checkTopScore()

                return () => clearInterval(loadingInterval)
            })

            onMounted(() => {
                window.addEventListener('keydown', handleKeyPress)
                stopAllThemes()
                if (props.isNewHighScore) {
                    playSound(highScoreBeatedTheme)
                } else {
                    playSound(gameOverTheme)
                }
            })

            onUnmounted(() => {
                window.removeEventListener('keydown', handleKeyPress)
            })

            return {
                username,
                showUsernameInput,
                showError,
                errorMessage,
                showSuccess,
                showConnectionError,
                isNewHighScore: props.isNewHighScore,
                submitUsername,
                isLoading,
                isSubmitting,
                loadingText,
                selectedIndex,
                isInputMode,
                handleKeyDown,
                usernameInput,
            }
        },
    })
</script>

<style scoped>
    .game-over-container {
        font-family: 'Press Start 2P';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.85);
        color: white;
        z-index: 10;
    }

    .game-over-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        max-width: 90%;
        padding: 2rem;
    }

    .loading {
        font-size: 2rem;
        animation: blink 1.5s infinite;
    }

    .title {
        font-size: 4rem;
        color: rgb(240, 230, 20);
        text-shadow: rgb(250, 0, 10) 3px 3px 0;
        margin-bottom: 1rem;
    }

    .scores {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        font-size: 1.8rem;
        margin: 1rem 0;
    }

    .new-record {
        color: #00ff00;
        font-size: 2rem;
        text-shadow: #008800 2px 2px 0;
        text-align: center;
        animation: pulse 2s infinite;
        margin: 0.5rem 0;
    }

    .username-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        width: 100%;
        max-width: 500px;
    }

    .leaderboard-text {
        font-size: 1.2rem;
        color: #fff;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
    }

    .input-button {
        width: 100%;
        max-width: 400px;
        padding: 0;
        background: transparent;
        border: none;
    }

    input {
        font-family: 'Press Start 2P';
        font-size: 1.2rem;
        padding: 0.8rem;
        background: transparent;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
        width: 30rem;
        box-shadow: rgb(50, 90, 230) 4px 4px 0;
    }

    input:focus {
        outline: none;
    }

    .selected input {
        color: rgb(240, 230, 20);
        box-shadow: rgb(250, 0, 10) 3px 3px 0;
        border-color: rgb(240, 230, 20);
    }

    .error-message {
        color: #ff0000;
        font-size: 1rem;
    }

    .submit-btn {
        font-size: 1.8rem;
        padding: 0.8rem 1.4rem;
    }

    .success-message {
        color: #00ff00;
        font-size: 1.2rem;
        text-align: center;
    }

    .connection-error {
        color: #ff0000;
        font-size: 1.2rem;
        text-align: center;
    }

    .connection-error .subtitle {
        font-size: 1rem;
        color: #888;
    }

    .press-key {
        font-size: 1.2rem;
        color: #888;
        animation: blink 1.5s infinite;
        margin-top: 1rem;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
</style>
