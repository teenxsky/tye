import { ref } from 'vue'
import {
    music,
    startTheme,
    optionsTheme,
    gameThemes,
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
            state.value.currentMenuScene !== 'credits' &&
            state.value.currentMenuScene !== 'highscores'
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

let currentGameThemeIndex = -1
let shuffledGameThemes: HTMLAudioElement[] = []

const shuffleGameThemes = () => {
    shuffledGameThemes = [...gameThemes]
    for (let i = shuffledGameThemes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledGameThemes[i], shuffledGameThemes[j]] = [shuffledGameThemes[j], shuffledGameThemes[i]]
    }
}

export const setGameScene = (scene: string) => {
    if (scene === 'start') {
        for (const theme of music) {
            stopSound(theme)
        }
        
        if (currentGameThemeIndex === -1 || currentGameThemeIndex >= shuffledGameThemes.length - 1) {
            shuffleGameThemes()
            currentGameThemeIndex = 0
        } else {
            currentGameThemeIndex++
        }

        const currentTheme = shuffledGameThemes[currentGameThemeIndex]
        currentTheme.addEventListener('ended', () => {
            currentGameThemeIndex++
            if (currentGameThemeIndex >= shuffledGameThemes.length) {
                shuffleGameThemes()
                currentGameThemeIndex = 0
            }
            playSound(shuffledGameThemes[currentGameThemeIndex])
        })
        
        playSound(currentTheme)
    }
    state.value.currentGameScene = scene
}
