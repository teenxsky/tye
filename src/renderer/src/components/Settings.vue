<template>
    <div class="settings-container">
        <h2 class="shadow-blue">SETTINGS</h2>
        <div class="setting" :class="{ selected: selectedSettingIndex === 0 }">
            <label for="music-volume" class="shadow-blue">MUSIC</label>
            <input
                id="music-volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                v-model="musicVolume"
                @input="updateMusicVolume"
            />
        </div>
        <div class="setting" :class="{ selected: selectedSettingIndex === 1 }">
            <label for="sound-volume" class="shadow-blue">SOUNDS</label>
            <input
                id="sound-volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                v-model="soundVolume"
                @input="updateSoundVolume"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
    state,
    keyEnterSound,
    keySound,
    playSound,
    music,
    sounds,
} from '@renderer/components/Composable.js'

export default {
    name: 'Settings',
    setup() {
        const musicVolume = ref(music[0].volume)
        const soundVolume = ref(sounds[0].volume)
        const selectedSettingIndex = ref(0)

        const updateMusicVolume = () => {
            for (const theme of Object.values(music)) {
                theme.volume = musicVolume.value
            }
        }

        const updateSoundVolume = () => {
            for (const sound of Object.values(sounds)) {
                sound.volume = soundVolume.value
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
                selectedSettingIndex.value =
                    (selectedSettingIndex.value - 1 + 2) % 2
                playSound(keySound)
            } else if (
                event.key === 'ArrowDown' ||
                event.key === 'S' ||
                event.key === 's' ||
                event.key === 'Ы' ||
                event.key === 'ы'
            ) {
                selectedSettingIndex.value =
                    (selectedSettingIndex.value + 1) % 2
                playSound(keySound)
            } else if (
                event.key === 'ArrowLeft' ||
                event.key === 'A' ||
                event.key === 'a' ||
                event.key === 'Ф' ||
                event.key === 'ф'
            ) {
                if (selectedSettingIndex.value === 0) {
                    musicVolume.value = Math.max(0, musicVolume.value - 0.1)
                    updateMusicVolume()
                } else if (selectedSettingIndex.value === 1) {
                    soundVolume.value = Math.max(0, soundVolume.value - 0.1)
                    updateSoundVolume()
                }
                playSound(keySound)
            } else if (
                event.key === 'ArrowRight' ||
                event.key === 'D' ||
                event.key === 'd' ||
                event.key === 'В' ||
                event.key === 'в'
            ) {
                if (selectedSettingIndex.value === 0) {
                    musicVolume.value = Math.min(1, musicVolume.value + 0.1)
                    updateMusicVolume()
                } else if (selectedSettingIndex.value === 1) {
                    soundVolume.value = Math.min(1, soundVolume.value + 0.1)
                    updateSoundVolume()
                }
                playSound(keySound)
            } else if (event.key === 'Escape') {
                playSound(keyEnterSound)
                state.value.currentMenuScene = 'options'
            }
        }

        onMounted(() => {
            window.addEventListener('keydown', handleKeyPress)
        })

        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeyPress)
        })

        return {
            musicVolume,
            soundVolume,
            selectedSettingIndex,
            updateMusicVolume,
            updateSoundVolume,
        }
    },
}
</script>

<style scoped>
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

.setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 50%;
    font-size: 5rem;
}

.setting.selected {
    color: rgb(240, 255, 0);
}

h2 {
    font-size: 5rem;
    color: white;
    margin-bottom: 10rem;
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
