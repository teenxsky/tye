import '@renderer/assets/main.css'

import { createApp } from 'vue'
import App from '@renderer/App.vue'

// import { Start } from './Scenes/Start.js'

// function main() {
//     // Get a reference to the container element
//     const container = document.querySelector('#scene-container')

//     // Create an instance of the World app
//     const startScene = new Start(container)

//     // Start the loop (produce a stream of frames)
//     startScene.start()
// }

// main()

createApp(App).mount('#app')
