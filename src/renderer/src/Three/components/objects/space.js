import * as THREE from 'three'

function createSpace(starsCount = 500) {
    let stars
    const starsGeo = new THREE.BufferGeometry()
    const points = []

    for (let i = 0; i < starsCount; i++) {
        const vertex_tl = new THREE.Vector3()
        vertex_tl.x = Math.random() * 500
        vertex_tl.y = Math.random() * 100
        vertex_tl.z = -Math.random() * 500
        points.push(vertex_tl)

        const vertex_tr = new THREE.Vector3()
        vertex_tr.x = -Math.random() * 500
        vertex_tr.y = Math.random() * 100
        vertex_tr.z = -Math.random() * 500
        points.push(vertex_tr)

        const vertex_bl = new THREE.Vector3()
        vertex_bl.x = Math.random() * 500
        vertex_bl.y = -Math.random() * 100
        vertex_bl.z = -Math.random() * 500
        points.push(vertex_bl)

        const vertex_br = new THREE.Vector3()
        vertex_br.x = -Math.random() * 500
        vertex_br.y = -Math.random() * 100
        vertex_br.z = -Math.random() * 500
        points.push(vertex_br)
    }

    const starsMat = new THREE.PointsMaterial({ color: 0xFFFFFF })

    starsGeo.setFromPoints(points)
    stars = new THREE.Points(starsGeo, starsMat)

    stars.tick = (delta) => {}

    return stars
}

export { createSpace }
