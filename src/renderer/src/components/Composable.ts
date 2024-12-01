import { ref } from 'vue'
import keySoundPath from '@renderer/assets/sounds/key.mp3'
import keyEnterSoundPath from '@renderer/assets/sounds/key_enter.mp3'
import startThemePath from '@renderer/assets/sounds/MetalSquad.mp3'

export const keyEnterSound = new Audio(keyEnterSoundPath)
export const keySound = new Audio(keySoundPath)
export const startTheme = new Audio(startThemePath)

keySound.preload = 'auto'
keySound.load()

keyEnterSound.preload = 'auto'
keyEnterSound.load()

startTheme.preload = 'auto'
startTheme.loop = true
startTheme.load()

export const state = ref({
    currentScene: 'menu',
    currentMenuScene: 'start',
})
