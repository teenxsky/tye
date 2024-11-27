import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { GameScene } from './GameScene/GameScene.jse.js'

function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene-container')

    // Create an instance of the World app
    const gameScene = new GameScene(container)

    // Start the loop (produce a stream of frames)
    gameScene.start()
}

main()

createApp(App).mount('#app')
