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

        this.generateWave()
    }

    generateWave() {
        this.enemyWave.generateWave(this.player.position)
    }

    enemyShot(enemy, laser) {
        laser.explode()
        enemy.destroy()
        this.enemyWave.enemiesOnTheScene.splice(
            this.enemyWave.enemiesOnTheScene.indexOf(enemy),
            1
        )
        this.currentScore += enemy.scoreOnDestroy
        this.handlers.setCurrentScore(this.currentScore)
    }

    playerShot(player, laser) {
        laser.explode()
        player.destroy()
        this.currentLives -= 1
        this.handlers.setCurrentLives(this.currentLives)
        if (this.currentLives === 0) {
            this.handlers.gameOver()
        }
    }

    intersetcts() {
        for (const laser of this.player.lasers) {
            for (const enemy of this.enemyWave.enemiesOnTheScene) {
                if (laser.position.distanceTo(enemy.root.position) < 2) {
                    if (enemy.visible) {
                        this.enemyShot(enemy, laser)
                    }
                }
            }
        }

        for (const enemy of this.enemyWave.enemiesOnTheScene) {
            enemy.lookAt(this.player.position)

            for (const laser of enemy.lasers) {
                if (laser.position.distanceTo(this.player.root.position) < 2) {
                    if (this.player.visible) {
                        this.playerShot(this.player, laser)
                    }
                }
            }
        }
    }

    gameOver() {
        console.log('Game Over')
    }

    tick(delta) {
        this.intersetcts()
        this.handlers.setCurrentAmmo(this.player.currentAmmo)

        if (this.enemyWave.enemiesOnTheScene.length === 0) {
            this.currentWave += 1
            this.handlers.setCurrentWave(this.currentWave)
            this.generateWave()
        }
    }
}

export { GameProcess }
