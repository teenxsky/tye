import { Spaceship } from './Spaceship.js'

class Player extends Spaceship {
    constructor(url, handlers, manager, inputManager) {
        super(url, handlers, manager)

        this.inputManager = inputManager
        this.speed = 20
    }

    tick(delta) {
        const direction =
            (this.inputManager.keys.right.pressed ? 1 : 0) +
            (this.inputManager.keys.left.pressed ? -1 : 0)
        this.translateX(direction * this.speed * delta)
    }
}

export { Player }
