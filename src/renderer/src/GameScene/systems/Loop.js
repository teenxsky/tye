import { Clock } from 'three'

const clock = new Clock()

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.objects_to_update = []
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick()
            // render a frame
            this.renderer.render(this.scene, this.camera)
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null)
    }

    tick() {
        const delta = clock.getDelta()
        for (const object of this.objects_to_update) {
            object.tick(delta)
        }
    }
}

export { Loop }
