import { Spaceship } from './Spaceship.js'
import { Laser } from './Laser.js'

class Enemy extends Spaceship {
    constructor(url, handlers, manager) {
        super(url, handlers, manager)

        this.speed = 20

        this.scoreOnDestroy = 10

        this.shakeAmplitude = 0.03
        this.shakeFrequency = 3
        this.elapsedTime = 0

        

        this.rotationX = 0

        this.shootingInterval = null
        this.timeToNextShot = 0
    }

    lookAt(target) {
        this.root.lookAt(target)
        this.rotateX((-8 * Math.PI) / 20)
    }

    shot() {
        const position = this.position.clone()
        const rotation = this.rotation.clone()
        const laser = new Laser(
            position,
            rotation,
            this.handlers,
            true,
            0xff0000
        )
        this.lasers.push(laser)
    }

    setShootingInterval(shootingInterval) {
        this.shootingInterval = shootingInterval
        this.timeToNextShot = this.shootingInterval
    }

    tick(delta) {
        if (!this.root.visible) {
            return
        }

        console.log(delta)

        this.elapsedTime += delta

        const shakeOffsetY =
            Math.sin(this.elapsedTime * this.shakeFrequency) *
            this.shakeAmplitude
        this.translateY(shakeOffsetY)

        const shakeOffsetX =
            Math.cos(this.elapsedTime * this.shakeFrequency) *
            this.shakeAmplitude
        this.translateX(shakeOffsetX)

        if (this.shootingInterval !== null) {
            this.timeToNextShot -= delta * 1000
            if (this.timeToNextShot <= 0) {
                this.shot()
                this.setShootingInterval(this.shootingInterval)
            }
        }

        this.removeUnusedObjects()
    }

    reset() {
        super.reset()
        this.lasers = []
        this.shootingInterval = null
        this.timeToNextShot = 0
    }
}

export { Enemy }
