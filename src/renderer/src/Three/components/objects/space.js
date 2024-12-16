import * as THREE from 'three'

function createSpace(starsCount = 1500) {
    let stars
    const starsGeo = new THREE.BufferGeometry()
    const starsMat = new THREE.PointsMaterial({
        vertexColors: true,
        size: 2.5,
    })
    const points = []
    const colors = []

    // const starColors = [
    //     new THREE.Color(0xfcefb0),
    //     new THREE.Color(0xfad187),
    //     new THREE.Color(0xc57613),
    //     new THREE.Color(0x7d0004),
    //     new THREE.Color(0x2f0304),
    // ]

    const starColors = [
        new THREE.Color(0xffffff),
        // new THREE.Color(0x062987),
        // new THREE.Color(0x0548c6),
        // new THREE.Color(0xefbe0a),
        // new THREE.Color(0xe10430),
    ]

    for (let i = 0; i < starsCount; i++) {
        const vertex = new THREE.Vector3()
        vertex.x = Math.random() * 550 - 275
        vertex.y = Math.random() * 700 - 350
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
        const speed = delta * 250

        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += speed

            if (positions[i + 2] > 10) {
                positions[i + 2] = -1000 + (positions[i + 2] % 1000)
            }
        }

        starsGeo.attributes.position.needsUpdate = true
    }

    return stars
}

export { createSpace }
