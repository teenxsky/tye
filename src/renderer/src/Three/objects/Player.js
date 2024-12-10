import { Spaceship } from './Spaceship.js'
import { Laser } from './Laser.js'

class Player extends Spaceship {
    constructor(url, handlers, manager, inputManager) {
        super(url, handlers, manager)

        this.inputManager = inputManager
        this.speed = 20

        this.maxX = 18
    }

    shot() {
        let laserPosition = this.position.clone()
        laserPosition.z -= 5
        const laser = new Laser(laserPosition, this.handlers)
        this.handlers.addObjToScene(laser)
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
    }
}

export { Player }
