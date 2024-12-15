import * as THREE from 'three'
import { Spaceship } from './Spaceship.js'
import { Laser } from './Laser.js'
import playerModel from '@renderer/assets/fighters/fighter01/result.gltf'
import { outOfAmmoSound, playSound } from '@renderer/components/Audio'

class Player extends Spaceship {
    constructor(handlers, manager, inputManager) {
        super(playerModel, handlers, manager)

        this.inputManager = inputManager

        this.angleX = (-8 * Math.PI) / 20
        this.posZ = -50
        this.pozY = -10
        this.currentAngleZ = 0

        this.speed = 30

        this.maxX = 18

        this.ammoAmount = 10
        this.currentAmmo = this.ammoAmount

        this.elapsedTime = 0

        this.ammoRegenRate = 1
    }

    computePosition() {
        this.currentAngleZ = Math.atan2(this.position.x, 50)
        this.rotation = new THREE.Euler(this.angleX, 0, -this.currentAngleZ)
        this.position = new THREE.Vector3(
            this.position.x,
            this.pozY,
            this.posZ - Math.abs(this.position.x / 20)
        )
    }

    shot() {
        if (this.currentAmmo > 0) {
            const position = this.position.clone()
            const rotation = this.rotation.clone()
            const laser = new Laser(position, rotation, this.handlers)
            this.lasers.push(laser)
            this.currentAmmo -= 1
            this.handlers
        } else {
            playSound(outOfAmmoSound)
        }
    }

    regenAmmo(delta) {
        this.elapsedTime += delta
        if (this.elapsedTime >= 0.5) {
            if (this.currentAmmo < this.ammoAmount) {
                this.currentAmmo += 1
            }

            this.elapsedTime = 0
        }
    }

    tick(delta) {
        const direction =
            (this.inputManager.keys.right.pressed ? 1 : 0) +
            (this.inputManager.keys.left.pressed ? -1 : 0)

        if (
            Math.abs(this.position.x + direction * this.speed * delta) <
            this.maxX
        ) {
            this.translateX(direction * this.speed * delta)
        }

        if (this.inputManager.keys.shot.justPressed > 0) {
            this.shot()
        }

        this.removeUnusedObjects()

        this.regenAmmo(delta)

        this.handlers.setCameraPosition(this.position, this.rotation)

        this.computePosition()
    }
}

export { Player }
