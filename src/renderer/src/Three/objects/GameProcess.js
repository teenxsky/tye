import { createExplosion } from './explosion.js'
import { lostLiveSound, playSound } from '@renderer/components/Audio'
import * as THREE from 'three'

class GameProcess {
    constructor(player, enemyWave, handlers) {
        this.player = player
        this.enemyWave = enemyWave
        this.handlers = handlers

        this.currentLives = 10
        this.livesAmount = this.currentLives
        this.currentScore = 0
        this.currentWave = 0

        this.waveInterval = 10 // Интервал появления волн (в секундах)
        this.minWaveInterval = 3 // Минимальный интервал между волнами
        this.waveSpeedIncrement = 0.1 // Увеличение скорости волн

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

        // Назначаем интервалы стрельбы для врагов в следующем ряду
        if (posX < this.enemyWave.enemiesOnTheScene.length - 1) {
            this.enemyWave.enemiesOnTheScene[posX + 1][
                posY
            ].setShootingInterval(Math.random() * 6000 + 3500)
        }

        this.handlers.setCurrentScore(this.currentScore)
    }

    playerShot(player, laser = null) {
        console.log('playerShot')
        if (laser) {
            laser.explode()
        }
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

                if (enemy.position.z > -80) {
                    this.playerShot(this.player)
                }

                for (const laser of enemy.lasers) {
                    if (
                        laser.position.distanceTo(this.player.root.position) <
                        3.5
                    ) {
                        if (this.player.visible && laser.isAlive) {
                            this.playerShot(this.player, laser)
                        }
                    }
                }
            }
        }
    }

    generateNextWave() {
        if (this.enemyWave.isWaveCleared()) {
            this.currentWave += 1
            console.log(this.currentWave)
            this.handlers.setCurrentWave(this.currentWave)
            console.log(this.currentWave)
            const spawnPosition = new THREE.Vector3(
                this.player.position.x,
                this.player.position.y,
                this.player.position.z - 25 // Смещение на 25 единиц вперёд по оси Z
            )
            console.log('generateNextWave')
            this.enemyWave.generateWave(10, 3000, spawnPosition)
        }
    }

    gameOver() {
        this.cleanup()
        this.handlers.gameOver()
        this.player.destroy()
    }

    tick(delta) {
        this.intersetcts()
        this.handlers.setCurrentAmmo(this.player.currentAmmo)

        this.enemyWave.moveWave(delta)

        this.generateNextWave()
    }

    cleanup() {
        // Очистка лазеров
        if (this.player && this.player.lasers) {
            this.player.lasers.forEach((laser) => {
                if (laser && laser.dispose) {
                    laser.dispose()
                }
            })
            this.player.lasers = []
        }

        // Очистка врагов
        if (this.enemyWave && this.enemyWave.enemiesOnTheScene) {
            this.enemyWave.enemiesOnTheScene.forEach((enemy) => {
                if (enemy && enemy.lasers) {
                    enemy.lasers.forEach((laser) => {
                        if (laser && laser.dispose) {
                            laser.dispose()
                        }
                    })
                }
                if (enemy && enemy.dispose) {
                    enemy.dispose()
                }
            })
            this.enemyWave.enemiesOnTheScene = []
        }
    }
}

export { GameProcess }
