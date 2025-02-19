const setSize = (container, camera, renderer) => {
    const width = container.clientWidth
    const height = container.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
    constructor(container, camera, renderer) {
        // Set initial size on load.
        setSize(container, camera, renderer)
        window.addEventListener('resize', () => {
            // Set the size again if a resize occurs.
            setSize(container, camera, renderer)
            // Perform any custom actions.
            this.onResize()
        })
    }
    onResize() {}
}

export { Resizer }
