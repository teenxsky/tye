import * as THREE from 'three'
import { shotSound, playSound } from '@renderer/components/Audio'

import { createExplosion } from './explosion.js'

class Laser extends THREE.Mesh {
    constructor(position, handlers, color = 0x74d600) {
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 5)
        const material = new THREE.MeshBasicMaterial({ color: color })
        super(geometry, material)

        this.position.copy(position)
        this.velocity = new THREE.Vector3(0, 0, -50)
        this.maxDistance = Math.random() * 200 + 200
        this.travelledDistance = 0

        this.handlers = handlers

        playSound(shotSound)
    }

    tick(delta) {
        const distance = this.velocity.length() * delta
        this.position.add(this.velocity.clone().multiplyScalar(delta))
        this.travelledDistance += distance

        if (this.travelledDistance >= this.maxDistance) {
            this.explode()
        }
    }

    explode() {
        const explosion = createExplosion(this.position)
        this.handlers.addObjToScene(explosion)

        this.parent.remove(this)
        this.geometry.dispose()
        this.material.dispose()
    }

    isAlive() {
        return this.travelledDistance < this.maxDistance
    }
}

export { Laser }
