import { ref } from 'vue'
import {
    music,
    startTheme,
    optionsTheme,
    gameTheme,
    stopSound,
    playSound,
} from './Audio'

export const state = ref({
    currentScene: 'menu',
    currentMenuScene: '',
    currentGameScene: '',
})

export const setMenuScene = (scene: string) => {
    if (scene === 'start') {
        if (state.value.currentMenuScene !== 'start') {
            for (const theme of music) {
                stopSound(theme)
            }
            playSound(startTheme)
        }
    } else if (scene === 'options') {
        if (
            state.value.currentMenuScene !== 'options' &&
            state.value.currentMenuScene !== 'settings' &&
            state.value.currentMenuScene !== 'credits'
        ) {
            for (const theme of music) {
                stopSound(theme)
            }
            playSound(optionsTheme)
        }
    }

    state.value.currentMenuScene = scene
}

setMenuScene('start')

export const setScene = (scene: string) => {
    if (scene === 'game') {
        for (const theme of music) {
            stopSound(theme)
        }
    }
    state.value.currentScene = scene
}

export const setGameScene = (scene: string) => {
    if (scene === 'start') {
        for (const theme of music) {
            stopSound(theme)
        }
        playSound(gameTheme)
    }
    state.value.currentGameScene = scene
}
