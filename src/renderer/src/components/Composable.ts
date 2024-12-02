import { ref } from 'vue'
import keySoundPath from '@renderer/assets/sounds/key.mp3'
import keyEnterSoundPath from '@renderer/assets/sounds/key_enter.mp3'
import startThemePath from '@renderer/assets/sounds/MetalSquad.mp3'
import optionsThemePath from '@renderer/assets/sounds/SpaceWalk.mp3'

export const keyEnterSound = new Audio(keyEnterSoundPath)
export const keySound = new Audio(keySoundPath)

export const startTheme = new Audio(startThemePath)
export const optionsTheme = new Audio(optionsThemePath)

keySound.preload = 'auto'
keySound.load()

keyEnterSound.preload = 'auto'
keyEnterSound.load()

startTheme.preload = 'auto'
startTheme.loop = true
startTheme.load()

startTheme.volume = 0
optionsTheme.volume = 0

export const state = ref({
    currentScene: 'menu',
    currentMenuScene: 'start',
})

export const playSound = (audio: HTMLAudioElement) => {
    audio.currentTime = 0 as number
    ;(audio.cloneNode(true) as HTMLAudioElement).play()
}

export const stopSound = (audio: HTMLAudioElement) => {
    audio.pause()
}
