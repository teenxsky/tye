import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createRenderer } from './components/renderer.js'
import { createSpace } from './components/objects/space.js'
import { Loop } from './systems/Loop.js'
import { Resizer } from './systems/Resizer.js'

let camera
let renderer
let scene
let loop

class MenuScene {
    constructor(container) {
        camera = createCamera()
        scene = createScene('black')
        renderer = createRenderer()
        
        loop = new Loop(camera, scene, renderer)
        container.append(renderer.domElement)
        
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
export { MenuScene }

