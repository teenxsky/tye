import { PerspectiveCamera } from 'three'

function createCamera() {
    const camera = new PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    camera.position.set(0, 0, 0)

    camera.currentView = 'pov'

    camera.changeView = () => {
        if (camera.currentView === 'pov') {
            camera.currentView = 'default'
        } else if (camera.currentView === 'default') {
            camera.currentView = 'top'
        } else if (camera.currentView === 'top') {
            camera.currentView = 'pov'
        }

        if (camera.currentView === 'default') {
            camera.fov = 22
            camera.position.set(0, 50, 80)
            camera.rotation.set(0, 0, 0)
            camera.rotateX(-Math.PI / 10)
        } else if (camera.currentView === 'top') {
            camera.fov = 40
            camera.position.set(0, 0, 0)
            camera.rotation.set(0, 0, 0)
        } else if (camera.currentView === 'pov') {
            camera.fov = 20
        }
        camera.updateProjectionMatrix()
    }

    camera.changeView()

    camera.tick = (delta) => {}

    return camera
}

export { createCamera }
