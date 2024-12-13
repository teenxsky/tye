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
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        z-index: 10;
    }

    .game-over-container p {
        font-size: 5rem;
        margin: 10px 0;
        text-align: center;
    }

    .game-over-container button {
        padding: 10px 20px;
        font-size: 1em;
        margin-top: 20px;
        cursor: pointer;
    }
</style>
