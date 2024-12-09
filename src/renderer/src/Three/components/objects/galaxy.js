import * as THREE from 'three'
import {
    color,
    cos,
    float,
    mix,
    range,
    sin,
    time,
    uniform,
    uv,
    vec3,
    vec4,
    PI2,
} from 'three/tsl'

function createGalaxy(colorInside = null, colorOutside = null) {
    const material = new THREE.SpriteMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })

    const size = uniform(0.08)
    material.scaleNode = range(0, 1).mul(size)

    const radiusRatio = range(0, 1)
    const radius = radiusRatio.pow(1.5).mul(5).toVar()

    const branches = 3
    const branchAngle = range(0, branches).floor().mul(PI2.div(branches))
    const angle = branchAngle.add(time.mul(radiusRatio.oneMinus()))

    const position = vec3(cos(angle), 0, sin(angle)).mul(radius)

    const randomOffset = range(vec3(-1), vec3(1))
        .pow(3)
        .mul(radiusRatio)
        .add(0.2)

    material.positionNode = position.add(randomOffset)

    if (!colorInside) {
        colorInside = uniform(color('#ffa575'))
    }

    if (!colorOutside) {
        colorOutside = uniform(color('#311599'))
    }

    const colorFinal = mix(
        colorInside,
        colorOutside,
        radiusRatio.oneMinus().pow(2).oneMinus()
    )
    const alpha = float(0.1).div(uv().sub(0.5).length()).sub(0.2)
    material.colorNode = vec4(colorFinal, alpha)

    const mesh = new THREE.InstancedMesh(
        new THREE.PlaneGeometry(1, 1),
        material,
        20000
    )

    mesh.tick = (delta) => {}

    return mesh
}

export { createGalaxy }
