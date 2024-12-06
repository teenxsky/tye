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
import { setMenuScene } from '@renderer/components/Scenes'
import { playSound, keyEnterSound, keySound } from '@renderer/components/Audio'
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
            if (options.value[index].label === 'SETTINGS') {
                setMenuScene('settings')
            } else {
                // Handle other button clicks if needed
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
                event.key === 'S' ||
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

<style>
.options-container {
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

.blink {
    animation: blink 2s linear infinite;
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
