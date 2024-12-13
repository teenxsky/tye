import { Spaceship } from './Spaceship.js'
import { Laser } from './Laser.js'

class Enemy extends Spaceship {
    constructor(url, handlers, manager) {
        super(url, handlers, manager)

        this.speed = 20

        this.lasers = []

        this.scoreOnDestroy = 10

        this.shakeAmplitude = 0.03
        this.shakeFrequency = 3
        this.elapsedTime = 0
    }

    lookAt(target) {
        this.root.lookAt(target)
        this.rotateX((-8 * Math.PI) / 20)
    }

    tick(delta) {
        this.elapsedTime += delta

        const shakeOffsetY =
            Math.sin(this.elapsedTime * this.shakeFrequency) *
            this.shakeAmplitude
        this.translateY(shakeOffsetY)

        const shakeOffsetX =
            Math.cos(this.elapsedTime * this.shakeFrequency) *
            this.shakeAmplitude
        this.translateX(shakeOffsetX)
    }
}

export { Enemy }
