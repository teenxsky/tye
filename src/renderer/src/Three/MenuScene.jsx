import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createRenderer } from './components/renderer.js'
import { createSpace } from './components/objects/space.js'
import { createGalaxy } from './components/objects/galaxy.js'
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { Loop } from './systems/Loop.js'
import { Resizer } from './systems/Resizer.js'
import * as THREE from 'three'

let camera
let renderer
let scene
let loop
let composer

class MenuScene {
    constructor(container) {
        camera = createCamera()
        scene = createScene('black')
        renderer = createRenderer()

        composer = new EffectComposer(renderer)
        composer.setSize(window.innerWidth, window.innerHeight)

        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight), 
            10, 
            1, 
            0.5
        )

        composer.renderToScreen = true
        composer.addPass(bloomPass)
        
        loop = new Loop(camera, scene, renderer, composer)
        container.append(renderer.domElement)
        
        const { light, lightHelper } = createLights('white')
        loop.objectsToUpdate.push(light)
        scene.add(light)

        let space = createSpace()
        loop.objectsToUpdate.push(space)
        scene.add(space)

        // let galaxy = createGalaxy()
        // loop.objectsToUpdate.push(galaxy)
        // scene.add(galaxy)

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

