import { Enemy } from './Enemy.js'
import * as THREE from 'three'
import enemyModel_1 from '/fighters/fighter02/result.gltf'
import enemyModel_2 from '/fighters/fighter03/result.gltf'
import enemyModel_3 from '/fighters/fighter04/result.gltf'
import enemyModel_4 from '/fighters/fighter05/result.gltf'

class EnemyWave {
    constructor(handlers, manager, rows = 10, cols = 10) {
        this.manager = manager
        this.handlers = handlers
        this.rows = rows
        this.cols = cols

        this.enemyModelsURL = [
            enemyModel_1,
            enemyModel_2,
            enemyModel_3,
            enemyModel_4,
        ]

        this.enemyScores = {
            [enemyModel_1]: 5,
            [enemyModel_2]: 10,
            [enemyModel_3]: 15,
            [enemyModel_4]: 20,
        }

        this.enemyModels = {}
        this.enemiesOnTheScene = []

        this.waveSpeed = 2

        for (let i = 0; i < this.rows; i++) {
            this.enemyModels[i] = []

            for (let j = 0; j < this.cols; j++) {
                const url = this.enemyModelsURL[i % this.enemyModelsURL.length]
                const enemy = new Enemy(url, this.handlers, this.manager)
                enemy.scoreOnDestroy = this.enemyScores[url]
                this.enemyModels[i].push(enemy)
            }
        }
    }

    generateWave(
        rows,
        shootingInterval = 3000,
        playerPosition = new THREE.Vector3(0, 0, 0)
    ) {
        let maxX = 38
        for (let i = 0; i < rows; i++) {
            const spacing = (2 * maxX) / (this.cols - 1)
            for (let j = 0; j < this.cols; j++) {
                const enemy = this.enemyModels[i][j]

                enemy.reset()
                this.enemiesOnTheScene.push(enemy)

                const position = new THREE.Vector3(
                    -maxX + j * spacing,
                    -10,
                    -70 + playerPosition.z - i * 40
                )

                enemy.rotationX = (-8 * Math.PI) / 20

                enemy.rotation = new THREE.Euler(
                    enemy.rotationX,
                    0,
                    Math.atan2(-position.x, 50)
                )

                enemy.position = position
            }
            maxX += 8
        }

        this.startShooting(shootingInterval)
    }

    startShooting(shootingInterval) {
        for (let j = 0; j < this.cols; j++) {
            for (let i = 0; i < this.rows; i++) {
                const enemy = this.enemiesOnTheScene[i * this.cols + j]
                if (enemy.visible) {
                    enemy.setShootingInterval(
                        Math.random() * shootingInterval + shootingInterval / 2
                    )

                    break
                }
            }
        }
    }

    moveWave(delta) {
        for (const enemy of this.enemiesOnTheScene) {
            if (!enemy.visible) {
                continue
            }

            const velocity = new THREE.Vector3(
                0,
                0,
                Math.cos(Math.atan2(-enemy.position.x, 50))
            )
            enemy.position.add(
                velocity.clone().multiplyScalar(delta * this.waveSpeed)
            )
        }
    }

    tick(delta) {}
}

export { EnemyWave }
