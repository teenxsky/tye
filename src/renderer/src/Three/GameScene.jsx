import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createRenderer } from './components/renderer.js'
import { createSpace } from './components/objects/space.js'
import { Loop } from './systems/Loop.js'
import { Resizer } from './systems/Resizer.js'
import { InputManager } from './systems/InputManager.js'
import { Player } from './objects/Player.js'
import * as THREE from 'three'
import { EnemyWave } from './objects/EnemyWave.js'
import { GameProcess } from './objects/GameProcess.js'

let camera
let renderer
let scene
let loop
let gameProcess

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
            // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
        }

        loadingManager.onLoad = () => {
            this.handlers.setLoading(false)
            this.onAllObjectsLoaded()
        }

        this.init()

        loop.objectsToUpdate.push(inputManager)

    }

    init() {
        const handlers = {
            onLoaded: this.onObjectLoaded.bind(this),
            addObjectToScene: this.addObjectToScene.bind(this),
            removeObjectFromScene: this.removeObjectFromScene.bind(this),
            setCameraPosition: this.setCameraPosition.bind(this)
        }

        this.spaceship = new Player(handlers, loadingManager, inputManager)

        this.enemyWave = new EnemyWave(handlers, loadingManager)

    }

    onObjectLoaded(obj) {
        obj.addToScene(scene)
        loop.objectsToUpdate.push(obj)
    }

    onAllObjectsLoaded() {
        const handlers = {
            onLoaded: this.onObjectLoaded.bind(this),
            addObjectToScene: this.addObjectToScene.bind(this),
            removeObjectFromScene: this.removeObjectFromScene.bind(this),
            setCurrentScore: this.setCurrentScore.bind(this),
            setCurrentLives: this.setCurrentLives.bind(this),
            setLivesAmount: this.setLivesAmount.bind(this),
            setCurrentWave: this.setCurrentWave.bind(this),
            setCurrentAmmo: this.setCurrentAmmo.bind(this),
            setAmmoAmount: this.setAmmoAmount.bind(this),

        }

        gameProcess = new GameProcess(this.spaceship, this.enemyWave, handlers)

        loop.objectsToUpdate.push(gameProcess)
    }

    setCurrentScore(score) {
        this.handlers.setCurrentScore(score)
    }

    setCurrentLives(value) {
        this.handlers.setCurrentLives(value)
    }

    setLivesAmount(value) {
        this.handlers.setLivesAmount(value)
    }

    setCurrentWave(value) {
        this.handlers.setCurrentWave(value)
    }

    setCurrentAmmo(value) {
        this.handlers.setCurrentAmmo(value)
    }

    setAmmoAmount(value) {
        this.handlers.setAmmoAmount(value)
    }

    addObjectToScene(obj) {
        scene.add(obj)
        loop.objectsToUpdate.push(obj)
    }

    removeObjectFromScene(obj) {
        scene.remove(obj)
        loop.objectsToUpdate = loop.objectsToUpdate.filter((o) => o !== obj)
    }

    handleKeyPress(e) {
        if (e.key === 'c' || 
            e.key === 'C' || 
            e.key === 'с' || 
            e.key === 'С') {
            camera.changeView() 
        }
    }

    setCameraPosition(position, rotation) {
        if (camera.currentView === 'pov') {
            camera.position.copy(position)
            camera.rotation.y = rotation.y * 3
        }
    }

    render() {
        renderer.render(scene, camera)
    }

    start() {
        loop.start()
        window.addEventListener('keydown', this.handleKeyPress.bind(this))
    }

    stop() {
        loop.stop()
        window.removeEventListener('keydown', this.handleKeyPress.bind(this))
    }
}

export { GameScene }

