import { Spaceship } from './Spaceship.js'
import { shotSound, playSound } from '@renderer/components/Audio'

class Player extends Spaceship {
    constructor(url, handlers, manager, inputManager) {
        super(url, handlers, manager)

        this.inputManager = inputManager
        this.speed = 20

        this.maxX = 15
    }

    shot() {
        playSound(shotSound)
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

        if (this.inputManager.keys.shot.pressed) {
            this.shot()
        }
    }
}

export { Player }
