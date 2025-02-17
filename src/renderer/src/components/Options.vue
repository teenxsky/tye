<template>
    <div class="options-container">
        <Button
            v-for="(button, index) in options"
            :key="index"
            :isSelected="selectedButtonIndex === index"
            @select="selectButton(index)"
            @click="handleButtonClick(index)"
        >
            {{ button.label }}
        </Button>
    </div>
</template>

<script lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { setMenuScene, setScene } from '@renderer/components/Scenes'
    import {
        playSound,
        keyEnterSound,
        keySound,
    } from '@renderer/components/Audio'
    import Button from '@renderer/components/Button.vue'

    export default {
        name: 'Options',
        components: {
            Button,
        },
        setup() {
            const options = ref([
                { label: 'PLAY' },
                { label: 'HIGHSCORES' },
                { label: 'SETTINGS' },
                { label: 'CREDITS' },
            ])
            const selectedButtonIndex = ref(0)

            const selectButton = (index) => {
                selectedButtonIndex.value = index
            }

            const handleButtonClick = (index) => {
                playSound(keyEnterSound)
                if (options.value[index].label === 'PLAY') {
                    setScene('game')
                } else if (options.value[index].label === 'HIGHSCORES') {
                    setMenuScene('highscores')
                } else if (options.value[index].label === 'SETTINGS') {
                    setMenuScene('settings')
                } else if (options.value[index].label === 'CREDITS') {
                    setMenuScene('credits')
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
                    selectedButtonIndex.value =
                        (selectedButtonIndex.value - 1 + options.value.length) %
                        options.value.length
                    playSound(keySound)
                } else if (
                    event.key === 'ArrowDown' ||
                    event.key === 's' ||
                    event.key === 'S' ||
                    event.key === 'Ы' ||
                    event.key === 'ы'
                ) {
                    selectedButtonIndex.value =
                        (selectedButtonIndex.value + 1) % options.value.length
                    playSound(keySound)
                } else if (event.key === 'Escape') {
                    playSound(keyEnterSound)
                    setMenuScene('start')
                } else if (event.key === 'Enter') {
                    handleButtonClick(selectedButtonIndex.value)
                }
            }

            onMounted(() => {
                window.addEventListener('keydown', handleKeyPress)
            })

            onUnmounted(() => {
                window.removeEventListener('keydown', handleKeyPress)
            })

            return {
                options,
                selectedButtonIndex,
                selectButton,
                handleButtonClick,
            }
        },
    }
</script>

<style scoped>
.options-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Press Start 2P';
    color: white;
    z-index: 1;
}

.options-container h1 {
    font-size: clamp(2rem, 5vw, 5rem);
    margin-bottom: clamp(2rem, 5vh, 5rem);
}

.options-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1rem, 2vh, 2rem);
}

.option-item {
    font-size: clamp(1rem, 3vw, 3rem);
    cursor: pointer;
}
</style>
