import * as THREE from 'three'
import { shotSound, playSound } from '@renderer/components/Audio'

import { createExplosion } from './explosion.js'

class Laser extends THREE.Mesh {
    constructor(
        position,
        rotation,
        handlers,
        reverseShooting = false,
        color = 0x74d600
    ) {
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 5)
        const material = new THREE.MeshBasicMaterial({ color: color })
        super(geometry, material)

        this.handlers = handlers

        this.isAlive = true

        this.maxDistance = Math.random() * 400 + 300
        this.travelledDistance = 0

        this.position.copy(position)

        const angleZ = rotation.z
        this.rotateY(angleZ)
        this.velocity = new THREE.Vector3(
            -Math.sin(angleZ) * 50,
            0,
            -Math.cos(angleZ) * 50
        )

        if (reverseShooting) {
            this.velocity.multiplyScalar(-1)
        }

        this.handlers.addObjectToScene(this)

        playSound(shotSound)
    }

    dispose() {
        if (this.isAlive) {
            this.isAlive = false
            
            if (this.handlers && typeof this.handlers.removeObjectFromScene === 'function') {
                this.handlers.removeObjectFromScene(this)
            }

            if (this.geometry) {
                this.geometry.dispose()
                this.geometry = null
            }
            
            if (this.material) {
                if (Array.isArray(this.material)) {
                    this.material.forEach(mat => {
                        if (mat && typeof mat.dispose === 'function') {
                            mat.dispose()
                        }
                    })
                } else if (typeof this.material.dispose === 'function') {
                    this.material.dispose()
                }
                this.material = null
            }
        }
    }

    explode() {
        if (this.isAlive) {
            createExplosion(this.position.clone(), this.handlers)
            this.dispose()
        }
    }

    tick(delta) {
        if (!this.isAlive || !this.geometry || !this.material) return

        const distance = this.velocity.length() * delta
        this.position.add(this.velocity.clone().multiplyScalar(delta))
        this.travelledDistance += distance

        if (Math.abs(this.travelledDistance) >= this.maxDistance) {
            this.explode()
        }
    }

    explode() {
        createExplosion(this.position, this.handlers)
        this.isAlive = false
        this.handlers.removeObjectFromScene(this)
        this.geometry.dispose()
        this.material.dispose()
    }
}

export { Laser }
