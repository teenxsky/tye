import keySoundPath from '@renderer/assets/sounds/key.wav'
import keyEnterSoundPath from '@renderer/assets/sounds/key_enter.wav'
import highScoreBeatedSoundPath from '@renderer/assets/sounds/hi_beated.wav'
import shotPath from '@renderer/assets/sounds/shot.wav'
import startThemePath from '@renderer/assets/sounds/MetalSquad.mp3'
import optionsThemePath from '@renderer/assets/sounds/SpaceWalk.mp3'

import gameTheme_1Path from '@renderer/assets/sounds/SeaOfFlame.mp3'
import gameTheme_2Path from '@renderer/assets/sounds/EvilDestroyer.mp3'
import gameTheme_3Path from '@renderer/assets/sounds/WarLikeRequiem.mp3'
import gameTheme_4Path from '@renderer/assets/sounds/StandUpAgainstMyself.mp3'

import highScoreBeatedThemePath from '@renderer/assets/sounds/BecauseYouretheNumberOne.mp3'
import highScoreThemePath from '@renderer/assets/sounds/TheStars.mp3'

import gameOverPath from '@renderer/assets/sounds/DeadEnd.mp3'
import explosion_1Path from '@renderer/assets/sounds/explosion_1.wav'
import explosion_2Path from '@renderer/assets/sounds/explosion_2.wav'
import explosion_3Path from '@renderer/assets/sounds/explosion_3.wav'
import outOfAmmoPath from '@renderer/assets/sounds/out_of_ammo.wav'
import lostLivePath from '@renderer/assets/sounds/lost_live.wav'

export const keyEnterSound = new Audio(keyEnterSoundPath)
export const keySound = new Audio(keySoundPath)
export const shotSound = new Audio(shotPath)
export const explosion_1Sound = new Audio(explosion_1Path)
export const explosion_2Sound = new Audio(explosion_2Path)
export const explosion_3Sound = new Audio(explosion_3Path)
export const outOfAmmoSound = new Audio(outOfAmmoPath)
export const lostLiveSound = new Audio(lostLivePath)
export const highScoreBeatedSound = new Audio(highScoreBeatedSoundPath)

export const startTheme = new Audio(startThemePath)
export const optionsTheme = new Audio(optionsThemePath)
export const gameTheme_1 = new Audio(gameTheme_1Path)
export const gameTheme_2 = new Audio(gameTheme_2Path)
export const gameTheme_3 = new Audio(gameTheme_3Path)
export const gameTheme_4 = new Audio(gameTheme_4Path)
export const gameOverTheme = new Audio(gameOverPath)
export const highScoreBeatedTheme = new Audio(highScoreBeatedThemePath)
export const highScoreTheme = new Audio(highScoreThemePath)

export const music = [
    startTheme,
    optionsTheme,
    gameTheme_1,
    gameTheme_2,
    gameTheme_3,
    gameTheme_4,
    gameOverTheme,
    highScoreBeatedTheme,
    highScoreTheme,
]

export const gameThemes = [gameTheme_1, gameTheme_2, gameTheme_3, gameTheme_4]

for (const theme of music) {
    // theme.preload = 'auto'
    if (!music.includes(theme)) {
        theme.loop = true
    }
    // theme.load()
    // theme.volume = 0
}

export const sounds = [
    keySound,
    keyEnterSound,
    shotSound,
    explosion_1Sound,
    explosion_2Sound,
    explosion_3Sound,
    outOfAmmoSound,
    lostLiveSound,
    highScoreBeatedSound,
]

export const explosions = [explosion_1Sound, explosion_2Sound, explosion_3Sound]

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

export const stopAllThemes = () => {
    for (const theme of music) {
        stopSound(theme)
    }
}

export const playSound = (audio: HTMLAudioElement) => {
    audio.currentTime = 0 as number
    audio.play()
}

export const stopSound = (audio: HTMLAudioElement) => {
    audio.pause()
}
