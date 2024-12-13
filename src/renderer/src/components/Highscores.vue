<template>
    <div class="leaderboard">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(score, index) in scores" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ score.username }}</td>
                    <td>{{ score.highScore }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="!scores || scores.length === 0">No scores available</div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { setMenuScene } from '@renderer/components/Scenes'
import { keySound, keyEnterSound, playSound } from '@renderer/components/Audio'
import Button from '@renderer/components/Button.vue'
import { getScores } from '../../../../server/api/LeaderBoard'

export default {
    name: 'Highscores',
    components: {
        Button,
    },
    setup() {
        const selectedHishscoreIndex = ref(0)
        const scores = ref(null)

        const fetchScores = async () => {
            try {
                const result = await getScores()
                if (result) {
                    scores.value = result
                } else {
                    // TODO: make lost connection page
                    setMenuScene('lost-connection')
                }
            } catch (err) {
                console.error('Error fetching scores:', err)
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
                selectedHishscoreIndex.value =
                    (selectedHishscoreIndex.value - 1 + 2) % 2
                playSound(keySound)
            } else if (
                event.key === 'ArrowDown' ||
                event.key === 'S' ||
                event.key === 's' ||
                event.key === 'Ы' ||
                event.key === 'ы'
            ) {
                selectedHishscoreIndex.value =
                    (selectedHishscoreIndex.value + 1) % 2
                playSound(keySound)
            } else if (event.key === 'Escape') {
                playSound(keyEnterSound)
                setMenuScene('options')
            }
        }

        onMounted(() => {
            window.addEventListener('keydown', handleKeyPress)
            fetchScores()
        })

        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeyPress)
        })

        return { selectedHishscoreIndex, scores }
    },
}
</script>

<style scoped>
.leaderboard {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.05);
}

.settings-container {
    font-family: 'Press Start 2P';
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10;
}

.highscores-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin-top: 8rem;
}

.setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 100%;
    font-size: 5rem;
}

.setting.selected {
    color: rgb(240, 255, 0);
}

h2 {
    font-size: 5rem;
    color: white;
}

label {
    display: block;
    font-size: 5rem;
    margin: 1rem;
}

input[type='range'] {
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    position: relative;
    height: 4rem;
    width: 20rem;
    overflow: hidden;
    pointer-events: none;
}

::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    background: #222;
}

::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    background: white;
    box-shadow: -20rem 10rem 0 20rem white;
    pointer-events: none;
}

::-moz-range-track {
    width: 100%;
    height: 100%;
    background: #222;
}

::-moz-range-thumb {
    width: 0;
    height: 100%;
    background: white;
    pointer-events: none;
}

::-ms-track {
    width: 100%;
    height: 100%;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

::-ms-fill-lower {
    background: #222;
}

:-ms-fill-upper {
    background: #222;
}

::-ms-thumb {
    width: 0;
    height: 100%;
    background: white;
    pointer-events: none;
}
</style>
