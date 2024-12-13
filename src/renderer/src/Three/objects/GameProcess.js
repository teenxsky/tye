import { lostLiveSound, playSound } from '@renderer/components/Audio'

class GameProcess {
    constructor(player, enemyWave, handlers) {
        this.player = player
        this.enemyWave = enemyWave
        this.handlers = handlers

        this.currentLives = 3
        this.livesAmount = 3
        this.currentScore = 0
        this.currentWave = 0

        this.handlers.setCurrentLives(this.currentLives)
        this.handlers.setLivesAmount(this.livesAmount)
        this.handlers.setCurrentScore(this.currentScore)
        this.handlers.setCurrentWave(this.currentWave)
        this.handlers.setCurrentAmmo(this.player.currentAmmo)
        this.handlers.setAmmoAmount(this.player.ammoAmount)

        this.generateNextWave()
    }

    enemyShot(enemy, laser, posX, posY) {
        laser.explode()
        enemy.destroy()
        this.currentScore += enemy.scoreOnDestroy
        // set shooting interval enemy behind current
        if (posX < this.enemyWave.enemiesOnTheScene.length - 1) {
            this.enemyWave.enemiesOnTheScene[posX + 1][
                posY
            ].setShootingInterval((Math.random() % 4000) + 1500)
        }

        this.handlers.setCurrentScore(this.currentScore)
    }

    playerShot(player, laser) {
        laser.explode()
        this.currentLives -= 1
        this.handlers.setCurrentLives(this.currentLives)
        if (this.currentLives === 0) {
            this.gameOver()
        } else {
            playSound(lostLiveSound)
        }
    }

    intersetcts() {
        for (const laser of this.player.lasers) {
            for (let i = 0; i < this.enemyWave.enemiesOnTheScene.length; i++) {
                for (
                    let j = 0;
                    j < this.enemyWave.enemiesOnTheScene[i].length;
                    j++
                ) {
                    const enemy = this.enemyWave.enemiesOnTheScene[i][j]
                    if (laser.position.distanceTo(enemy.root.position) < 2) {
                        if (enemy.visible) {
                            this.enemyShot(enemy, laser, i, j)
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.enemyWave.enemiesOnTheScene.length; i++) {
            for (
                let j = 0;
                j < this.enemyWave.enemiesOnTheScene[i].length;
                j++
            ) {
                const enemy = this.enemyWave.enemiesOnTheScene[i][j]
                enemy.lookAt(this.player.position)

                for (const laser of enemy.lasers) {
                    if (
                        laser.position.distanceTo(this.player.root.position) <
                        3.5
                    ) {
                        if (this.player.visible) {
                            this.playerShot(this.player, laser)
                        }
                    }
                }
            }
        }
    }
    generateNextWave() {
        this.currentWave += 1
        this.handlers.setCurrentWave(this.currentWave)
        this.enemyWave.generateWave(
            Math.max(4 + this.currentWave, 10),
            5000 - this.currentWave * 100,
            this.player.position
        )
    }

    gameOver() {
        this.handlers.gameOver()
        this.player.destroy()
    }

    tick(delta) {
        this.intersetcts()
        this.handlers.setCurrentAmmo(this.player.currentAmmo)

        this.enemyWave.moveWave(delta)

        if (this.enemyWave.enemiesOnTheScene.length === 0) {
            this.generateNextWave()
        }
    }
}

export { GameProcess }
