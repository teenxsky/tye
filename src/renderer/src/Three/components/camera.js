import { PerspectiveCamera } from 'three'

function createCamera() {
    const camera = new PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    camera.position.set(0, 0, 0)
    camera.tick = (delta) => {}

    return camera
}

export { createCamera }
