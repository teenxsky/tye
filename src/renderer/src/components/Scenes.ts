import { ref } from 'vue'
import { music, startTheme, optionsTheme, stopSound, playSound } from './Audio'

export const state = ref({
    currentScene: 'menu',
    currentMenuScene: '',
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

export const setScene = (scene: string) => {
    state.value.currentScene = scene
}
