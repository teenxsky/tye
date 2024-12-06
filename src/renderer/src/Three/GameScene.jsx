import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createRenderer } from './components/renderer.js'
import { createSpace } from './components/objects/space.js'
import { Loop } from './systems/Loop.js'
import { Resizer } from './systems/Resizer.js'
import { Spaceship } from './objects/spaceship.js'
import fighter from '@renderer/assets/fighters/fighter01/result.glb'

let camera
let renderer
let scene
let loop

class GameScene {
    constructor(container) {
        camera = createCamera()
        scene = createScene('black')
        renderer = createRenderer()
        
        loop = new Loop(camera, scene, renderer)
        container.append(renderer.domElement)
        
        camera.position.set(0, -30, 10)
        camera.lookAt(0, 0, 0)
        
        const { light, lightHelper } = createLights('white')
        loop.objectsToUpdate.push(light)
        scene.add(light)

        let space = createSpace()
        loop.objectsToUpdate.push(space)
        scene.add(space)

        const resizer = new Resizer(container, camera, renderer)
        resizer.onResize = () => {
            this.render()
        }

        this.init()
    }

    init() {
        const spaceship = new Spaceship(fighter, scene)
        // spaceship.setPos(0, 0, 0)
        // loop.objectsToUpdate.push(spaceship)
        window.addEventListener('keydown', (event) => this.handleKeyDown(event, spaceship))
        window.addEventListener('keyup', (event) => this.handleKeyUp(event, spaceship))
    }

    handleKeyDown(event, spaceship) {
        switch (event.key) {
            case 'ArrowLeft':
                spaceship.moveLeft()
                break
            case 'ArrowRight':
                spaceship.moveRight()
                break
        }
    }

    handleKeyUp(event, spaceship) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                spaceship.setVelocity(0, 0, 0)
                break
        }
    }

    render() {
        renderer.render(scene, camera)
    }

    start() {
        loop.start()
    }

    stop() {
        loop.stop()
    }
}

export { GameScene }

