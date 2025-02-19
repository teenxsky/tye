import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import * as THREE from 'three'

class Spaceship {
    constructor(url, handlers, manager) {
        const gltfLoader = new GLTFLoader(manager)

        this.url = url
        this.manager = manager

        const model = {
            url: url,
            gltf: null,
        }

        this.handlers = handlers

        this.lasers = []

        gltfLoader.load(
            model.url,
            (gltf) => {
                model.gltf = gltf
                this.model = model
                this.handlers.onLoaded(this)
            },
            undefined,
            (error) => {
                console.log('Error loading 3D model:', error, this)
            }
        )
    }

    removeUnusedObjects() {
        for (const laser of this.lasers) {
            if (!laser.isAlive) {
                this.lasers.splice(this.lasers.indexOf(laser), 1)
            }
        }
    }

    get position() {
        return this.root.position
    }

    set position(position) {
        this.root.position.copy(position)
    }

    get rotation() {
        return this.root.rotation
    }

    set rotation(rotation) {
        this.root.rotation.copy(rotation)
    }

    addToScene(scene) {
        const clonedScene = SkeletonUtils.clone(this.model.gltf.scene)
        this.root = new THREE.Object3D()
        this.root.add(clonedScene)
        scene.add(this.root)
    }

    translateX(distance) {
        this.root.translateX(distance)
    }

    translateY(distance) {
        this.root.translateY(distance)
    }

    translateZ(distance) {
        this.root.translateZ(distance)
    }

    setRotation(x, y, z) {
        this.root.rotation.set(x, y, z)
    }

    rotateX(angle) {
        this.root.rotateX(angle)
    }

    rotateY(angle) {
        this.root.rotateY(angle)
    }

    rotateZ(angle) {
        this.root.rotateZ(angle)
    }

    get visible() {
        return this.root.visible
    }

    set visible(value) {
        this.root.visible = value
    }

    reset() {
        this.root.visible = true
    }

    destroy() {
        // this.handlers.removeObjectFromScene(this.model.gltf.scene)
        // this.handlers.removeObjectFromScene(this.root)
        this.root.visible = false
    }
}

export { Spaceship }
