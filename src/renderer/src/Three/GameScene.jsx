import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createRenderer } from './components/renderer.js'
import { createSpace } from './components/objects/space.js'
import { Loop } from './systems/Loop.js'
import { Resizer } from './systems/Resizer.js'
import { InputManager } from './systems/InputManager.js'
import { Player } from './objects/Player.js'
import playerModel from '@renderer/assets/fighters/fighter01/result.gltf'
import enemyModel from '@renderer/assets/fighters/fighter02/result.gltf'
import * as THREE from 'three'

let camera
let renderer
let scene
let loop

const inputManager = new InputManager()

const loadingManager = new THREE.LoadingManager()

class GameScene {
    constructor(container, handlers) {
        this.handlers = handlers

        camera = createCamera()
        scene = createScene('black')
        renderer = createRenderer()

        loop = new Loop(camera, scene, renderer)
        container.append(renderer.domElement)

        loop.objectsToUpdate.push(inputManager)
        
        const { light, lightHelper } = createLights('white')
        loop.objectsToUpdate.push(light)
        scene.add(light)

        let space = createSpace()
        space.isMoving = true
        loop.objectsToUpdate.push(space)
        scene.add(space)

        const resizer = new Resizer(container, camera, renderer)
        resizer.onResize = () => {
            this.render()
        }

        loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
        }

        loadingManager.onLoad = () => {
            this.handlers.setLoading(false)
        }

        this.init()
    }

    init() {
        this.spaceship = new Player(playerModel, {
            onLoaded: this.onObjectLoaded.bind(this)
        }, loadingManager, inputManager)
    }

    onObjectLoaded(obj) {
        obj.addToScene(scene)
        obj.translateZ(-45)
        obj.translateY(-8)
        obj.rotateX(-8 * Math.PI / 20)
        loop.objectsToUpdate.push(obj)
        
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

