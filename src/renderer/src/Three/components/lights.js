import { DirectionalLight, DirectionalLightHelper } from 'three'

function createLights(color) {
    const light = new DirectionalLight(color, 4)
    const lightHelper = new DirectionalLightHelper(light, 0)
    light.position.set(0, 0, 5)
    light.tick = (delta) => {}
    return { light, lightHelper }
}

export { createLights }
