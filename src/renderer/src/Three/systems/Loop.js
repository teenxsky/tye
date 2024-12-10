import { Clock } from 'three'

const clock = new Clock()

class Loop {
    constructor(camera, scene, renderer, composer = null) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.composer = composer
        this.objectsToUpdate = []
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick()
            if (this.composer) {
                this.composer.render(this.scene, this.camera)
            } else {
                this.renderer.render(this.scene, this.camera)
            }
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null)
    }

    tick() {
        const delta = clock.getDelta()
        for (const object of this.objectsToUpdate) {
            object.tick(delta)

            if (object.isAlive && !object.isAlive()) {
                this.objectsToUpdate = this.objectsToUpdate.filter(
                    (obj) => obj !== object
                )
            }
        }
    }
}

export { Loop }
