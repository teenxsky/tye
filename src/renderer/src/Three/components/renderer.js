import { WebGLRenderer } from 'three'

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(
        window.devicePixelRatio ? window.devicePixelRatio : 1
    )
    // renderer.setPixelRatio(0.2)
    renderer.physicallyCorrectLights = true
    return renderer
}

export { createRenderer }
