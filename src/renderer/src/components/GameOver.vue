<template>
    <div class="game-over-container">
        <p>
            Game Over
            <br />
            <br />
            <br />
            Your Score: {{ currentScore }}
            <br />
            <br />
            High Score: {{ highScore }}
        </p>
        <p v-if="isNewHighScore">Congratulations! You beat your high score!</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'

    export default defineComponent({
        name: 'GameOver',
        props: {
            currentScore: {
                type: Number,
                required: true,
            },
            highScore: {
                type: Number,
                required: true,
            },
        },
        setup(props) {
            const isNewHighScore = computed(
                () => props.currentScore > props.highScore
            )

            return {
                isNewHighScore,
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        z-index: 10;
    }

    .game-over-container p {
        font-size: clamp(2rem, 5vw, 5rem);
        margin: clamp(0.5rem, 1vh, 1rem) 0;
        text-align: center;
    }

    .game-over-container button {
        padding: clamp(0.5rem, 1vw, 1rem) clamp(1rem, 2vw, 2rem);
        font-size: clamp(1rem, 2vw, 2rem);
        margin-top: clamp(1rem, 2vh, 2rem);
        cursor: pointer;
    }
</style>
