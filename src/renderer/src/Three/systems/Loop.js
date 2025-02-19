import { Clock } from 'three'

const clock = new Clock()

class Loop {
    constructor(camera, scene, renderer, composer = null) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.composer = composer
        this.objectsToUpdate = []
        this.pausedDelta = -1

        this.avgFrameRate = 0
    }

    start() {
        this.pausedDelta = -1
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
        this.pausedDelta = clock.getDelta()
        this.renderer.setAnimationLoop(null)
    }

    tick() {
        let delta = clock.getDelta()

        this.avgFrameRate = this.avgFrameRate * 0.9 + delta * 0.1

        for (const object of this.objectsToUpdate) {
            // if (this.pausedDelta != -1) {
            //     delta = this.pausedDelta
            // }
            if (delta > this.avgFrameRate * 1.5) {
                delta = 0
            }
            object.tick(delta)
        }
    }
}

export { Loop }