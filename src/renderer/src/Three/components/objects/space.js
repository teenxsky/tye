import * as THREE from 'three'

function createSpace(starsCount = 1200) {
    let stars
    const starsGeo = new THREE.BufferGeometry()
    const starsMat = new THREE.PointsMaterial({
        vertexColors: true,
        size: 2.5,
    })
    const points = []
    const colors = []

    const starColors = [
        new THREE.Color(0x1e90ff),
        // new THREE.Color(0xff4500),
        new THREE.Color(0x32cd32),
        // new THREE.Color(0xffff00),
        // new THREE.Color(0xffffff),
    ]

    for (let i = 0; i < starsCount; i++) {
        const vertex = new THREE.Vector3()
        vertex.x = Math.random() * 500 - 250
        vertex.y = Math.random() * 500 - 250
        vertex.z = -Math.random() * 1000 - 500
        points.push(vertex)

        const color = starColors[Math.floor(Math.random() * starColors.length)]
        colors.push(color.r, color.g, color.b)
    }

    starsGeo.setFromPoints(points)
    starsGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    stars = new THREE.Points(starsGeo, starsMat)

    const rotationMatrix = new THREE.Matrix4()

    stars.isMoving = false

    stars.tick = (delta) => {
        const angle = delta * 0.005
        rotationMatrix.makeRotationZ(angle)
        starsGeo.applyMatrix4(rotationMatrix)

        if (!stars.isMoving) {
            return
        }

        const positions = starsGeo.attributes.position.array
        const speed = delta * 80

        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += speed

            if (positions[i + 2] > 10) {
                positions[i + 2] = -1000
            }
        }

        starsGeo.attributes.position.needsUpdate = true
    }

    return stars
}

export { createSpace }
