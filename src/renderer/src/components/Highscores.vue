<template>
    <div class="highscores-container">
        <div v-if="isLoading" class="loading non-highlighted">
            {{ loadingText }}
        </div>
        <template v-else-if="scores === null">
            <div class="lost-connection">
                <h1 class="non-highlighted">Lost connection</h1>
                <h2>
                    There is no internet connection or this option is not
                    available in your region
                </h2>
            </div>
        </template>
        <template v-else>
            <h1 class="non-highlighted">HIGH SCORES</h1>
            <div class="scores-table">
                <div class="table-header">
                    <div class="rank">#</div>
                    <div class="name">NAME</div>
                    <div class="score">SCORE</div>
                </div>
                <div class="table-body">
                    <Button
                        v-for="(score, index) in scores"
                        :key="index"
                        :isSelected="selectedScoreIndex === index"
                        class="score-row"
                    >
                        <div class="score-content">
                            <span class="rank">{{ index + 1 }}</span>
                            <span class="name">{{ score.username }}</span>
                            <span class="score">{{ score.highScore }}</span>
                        </div>
                    </Button>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { setMenuScene } from '@renderer/components/Scenes'
    import {
        keySound,
        keyEnterSound,
        playSound,
    } from '@renderer/components/Audio'
    import Button from '@renderer/components/Button.vue'
    import { getScores } from '../../../../server/api/LeaderBoard'

    export default {
        name: 'Highscores',
        components: {
            Button,
        },
        setup() {
            const selectedScoreIndex = ref(0)
            const scores = ref(null)
            const isLoading = ref(true)
            const loadingText = ref('Loading')

            const fetchScores = async () => {
                try {
                    const result = await getScores()
                    if (result) {
                        scores.value = result
                    }
                } catch (err) {
                    console.error('Error fetching scores:', err)
                } finally {
                    isLoading.value = false
                }
            }

            const handleKeyPress = (event: KeyboardEvent) => {
                if (
                    event.key === 'ArrowUp' ||
                    event.key === 'W' ||
                    event.key === 'w' ||
                    event.key === 'Ц' ||
                    event.key === 'ц'
                ) {
                    selectedScoreIndex.value =
                        (selectedScoreIndex.value - 1 + scores.value.length) %
                        scores.value.length
                    playSound(keySound)
                } else if (
                    event.key === 'ArrowDown' ||
                    event.key === 'S' ||
                    event.key === 's' ||
                    event.key === 'Ы' ||
                    event.key === 'ы'
                ) {
                    selectedScoreIndex.value =
                        (selectedScoreIndex.value + 1) % scores.value.length
                    playSound(keySound)
                } else if (event.key === 'Escape') {
                    playSound(keyEnterSound)
                    setMenuScene('options')
                }
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

                fetchScores()

                return () => clearInterval(loadingInterval)
            })

            onUnmounted(() => {
                window.removeEventListener('keydown', handleKeyPress)
            })

            return { selectedScoreIndex, scores, isLoading, loadingText }
        },
    }
</script>

<style scoped>
    .highscores-container {
        font-family: 'Press Start 2P';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    .lost-connection {
        text-align: center;
        padding: 2rem;
    }

    .lost-connection h1 {
        font-size: min(5.5vw, 5.5rem);
        margin-bottom: 4rem;
    }

    .lost-connection h2 {
        font-size: min(2.5vw, 2.5rem);
        line-height: 1.5;
    }

    h1 {
        font-size: min(5.5vw, 5.5rem);
        margin-bottom: 4rem;
    }

    .scores-table {
        width: min(800px, 80vw);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 60vh;
        overflow-y: auto;
    }

    .table-header {
        display: grid;
        grid-template-columns: 0.5fr 2fr 1fr;
        padding: 1rem;
        color: rgb(240, 230, 20);
        text-shadow: rgb(250, 0, 10) 3px 3px 0;
        font-size: min(2.5vw, 2.5rem);
        position: sticky;
        top: 0;
        background-color: black;
    }

    .table-body {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .score-row {
        width: 100%;
        padding: 0.5rem 1rem;
        margin: 0;
        text-align: left;
    }

    .score-content {
        display: grid;
        grid-template-columns: 0.5fr 2fr 1fr;
        width: 100%;
        font-size: min(2vw, 2rem);
    }

    .rank {
        text-align: left;
    }

    .name {
        text-align: left;
    }

    .score {
        text-align: right;
    }

    .loading {
        position: fixed;
        font-family: 'Press Start 2P';
        color: white;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        background-color: black;
        justify-content: center;
        align-items: center;
        font-size: clamp(1.5rem, 5vw, 3rem);
        z-index: 10;
    }

    .scores-table::-webkit-scrollbar {
        width: 10px;
    }

    .scores-table::-webkit-scrollbar-track {
        background: #222;
    }

    .scores-table::-webkit-scrollbar-thumb {
        background: #444;
    }
</style>