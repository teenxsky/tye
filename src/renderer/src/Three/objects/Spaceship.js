import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import * as THREE from 'three'

class Spaceship {
    constructor(url, scene) {
        const manager = new THREE.LoadingManager()
        const gltfLoader = new GLTFLoader(manager)

        const model = {
            url: url,
            gltf: null,
        }

        gltfLoader.load(
            model.url,
            (gltf) => {
                model.gltf = gltf
                this.addToScene(model, scene)
            },
            undefined,
            (error) => {
                console.log('Error loading 3D model:', error)
            }
        )

        self.model = model
    }

    addToScene(model, scene) {
        const clonedScene = SkeletonUtils.clone(model.gltf.scene)
        this.root = new THREE.Object3D()
        this.root.add(clonedScene)
        scene.add(this.root)
    }

    moveLeft() {
        this.root.position.x -= 5
    }

    moveRight() {
        this.root.position.x += 5
    }

    setPos(x, y, z) {
        this.root.position.set(x, y, z)
    }
}

export { Spaceship }
