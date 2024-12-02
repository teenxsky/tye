import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createRenderer } from './components/renderer.js'
import { createSpace } from './components/objects/space.js'
import { Loop } from './systems/Loop.js'
import { Resizer } from './systems/Resizer.js'

// These variables are module-scoped: we cannot access them
// from outside the module.
let camera
let renderer
let scene
let loop

class MenuScene {
    constructor(container) {
        // Instances of camera, scene, and renderer
        camera = createCamera()
        scene = createScene('black')
        renderer = createRenderer()
        // Initialize Loop
        loop = new Loop(camera, scene, renderer)
        container.append(renderer.domElement)
        // Light Instance, with optional light helper
        const { light, lightHelper } = createLights('white')
        loop.objects_to_update.push(light)
        scene.add(light)

        let space = createSpace()
        loop.objects_to_update.push(space)
        scene.add(space)

        const resizer = new Resizer(container, camera, renderer)
        resizer.onResize = () => {
            this.render()
        }
    }
    render() {
        // Draw a single frame
        renderer.render(scene, camera)
    }
    // Animation handlers
    start() {
        loop.start()
    }
    stop() {
        loop.stop()
    }
}
export { MenuScene }

