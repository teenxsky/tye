/// <reference types="vite/client" />

declare module '*.gltf' {
    const src: string
    export default src
}

declare module '*.glb' {
    const src: string
    export default src
}

declare module '*.mp3' {
    const src: string
    export default src
}

declare module '*.wav' {
    const src: string
    export default src
}

declare module '*.ttf' {
    const src: string
    export default src
}

declare module '*.otf' {
    const src: string
    export default src
}

declare module '*.bin' {
    const src: string
    export default src
}

declare module '*.png' {
    const src: string
    export default src
}

declare module '@renderer/components/Scenes' {
    export const state: any
    export function setMenuScene(scene: string): void
    export function setScene(scene: string): void
    export function setGameScene(scene: string): void
}

declare module '@renderer/components/Settings' {
    export function loadSettings(): void
    export function saveSettings(): void
}

declare module '@renderer/Three/MenuScene.jsx' {
    export class MenuScene {
        constructor(container: HTMLElement | null)
        start(): void
        stop(): void
    }
}

declare module '@renderer/Three/GameScene.jsx' {
    export class GameScene {
        constructor(
            container: HTMLElement | null,
            callbacks: {
                setLoading: (value: boolean) => void
                setHighScore: (value: number) => void
                setCurrentScore: (value: number) => void
                setCurrentLives: (value: number) => void
                setLivesAmount: (value: number) => void
                setCurrentWave: (value: number) => void
                setCurrentAmmo: (value: number) => void
                setAmmoAmount: (value: number) => void
                gameOver: () => void
                onGameOver: () => void
            }
        )
        start(): void
        stop(): void
    }
}

declare module '@renderer/components/Audio' {
    export function playSound(sound: any): void
    export function stopSound(sound: any): void
    export const keyEnterSound: any
    export const keySound: any
    export const music: any[]
    export const sounds: any[]
    export const gameOverTheme: any
    export const highScoreBeatedSound: any
    export const highScoreBeatedTheme: any
    export const highScoreTheme: any
    export const gameThemes: any[]
    export function setMusicVolume(volume: number): void
    export function setSoundVolume(volume: number): void
    export function stopAllThemes(): void
}

declare module '@renderer/components/Scores' {
    export function loadScore(): number
    export function saveScore(score: number): void
}
