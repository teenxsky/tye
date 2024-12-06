import keySoundPath from '@renderer/assets/sounds/key.wav'
import keyEnterSoundPath from '@renderer/assets/sounds/key_enter.wav'
import shotSoundPath from '@renderer/assets/sounds/shot.wav'
import startThemePath from '@renderer/assets/sounds/MetalSquad.mp3'
import optionsThemePath from '@renderer/assets/sounds/SpaceWalk.mp3'
import gameThemePath from '@renderer/assets/sounds/SeaOfFlame.mp3'

export const keyEnterSound = new Audio(keyEnterSoundPath)
export const keySound = new Audio(keySoundPath)
export const shotSound = new Audio(shotSoundPath)

export const startTheme = new Audio(startThemePath)
export const optionsTheme = new Audio(optionsThemePath)
export const gameTheme = new Audio(gameThemePath)

export const music = [startTheme, optionsTheme, gameTheme]

for (const theme of music) {
    // theme.preload = 'auto'
    theme.loop = true
    // theme.load()
    // theme.volume = 0
}

export const sounds = [keySound, keyEnterSound]

for (const sound of sounds) {
    sound.preload = 'auto'
    sound.load()
}

export const setMusicVolume = (volume: number) => {
    for (const theme of music) {
        theme.volume = volume
    }
}

export const setSoundVolume = (volume: number) => {
    for (const sound of sounds) {
        sound.volume = volume
    }
}

export const playSound = (audio: HTMLAudioElement) => {
    audio.currentTime = 0 as number
    audio.play()
}

export const stopSound = (audio: HTMLAudioElement) => {
    audio.pause()
}
