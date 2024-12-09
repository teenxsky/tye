import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import * as THREE from 'three'

class Spaceship {
    constructor(url, handlers, manager) {
        const gltfLoader = new GLTFLoader(manager)

        const model = {
            url: url,
            gltf: null,
        }

        gltfLoader.load(
            model.url,
            (gltf) => {
                model.gltf = gltf
                this.model = model
                handlers.onLoaded(this)
            },
            undefined,
            (error) => {
                console.log('Error loading 3D model:', error, this)
            }
        )
    }

    addToScene(scene) {
        const clonedScene = SkeletonUtils.clone(this.model.gltf.scene)
        this.root = new THREE.Object3D()
        this.root.add(clonedScene)
        scene.add(this.root)
    }

    setPos(x, y, z) {
        this.root.position.set(x, y, z)
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
}

export { Spaceship }
