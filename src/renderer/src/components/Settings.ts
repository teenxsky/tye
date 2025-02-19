import { music, sounds } from './Audio'

export const loadSettings = () => {
    const savedMusicVolume = localStorage.getItem('musicVolume')
    const savedSoundVolume = localStorage.getItem('soundVolume')
    if (savedMusicVolume !== null) {
        for (const theme of music) {
            theme.volume = parseFloat(savedMusicVolume)
        }
    }
    if (savedSoundVolume !== null) {
        for (const sound of sounds) {
            sound.volume = parseFloat(savedSoundVolume)
        }
    }
}

export const saveSettings = () => {
    localStorage.setItem('musicVolume', music[0].volume.toString())
    localStorage.setItem('soundVolume', sounds[0].volume.toString())
}
