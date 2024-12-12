import { Enemy } from './Enemy.js'
import * as THREE from 'three'
import enemyModel_1 from '@renderer/assets/fighters/fighter02/result.gltf'
import enemyModel_2 from '@renderer/assets/fighters/fighter03/result.gltf'
import enemyModel_3 from '@renderer/assets/fighters/fighter04/result.gltf'
import enemyModel_4 from '@renderer/assets/fighters/fighter05/result.gltf'

class EnemyWave {
    constructor(handlers, manager, rows = 5, cols = 10) {
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

        this.enemies = []
        this.enemiesOnTheScene = []

        for (let i = 0; i < this.rows * this.cols; i++) {
            const url = this.enemyModelsURL[i % this.enemyModelsURL.length]
            const enemy = new Enemy(url, this.handlers, this.manager)
            enemy.scoreOnDestroy = this.enemyScores[url]
            this.enemies.push(enemy)
        }
    }

    generateWave(playerPosition = new THREE.Vector3(0, 0, 0)) {
        const maxX = 37
        const spacing = (2 * maxX) / (this.cols - 1)
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const enemy = this.enemies[row * this.cols + col]

                enemy.reset()
                this.enemiesOnTheScene.push(enemy)

                const position = new THREE.Vector3(
                    -maxX + spacing * col - enemy.root.scale.x / 2,
                    -10,
                    -50 + playerPosition.z - row * 40
                )

                enemy.rotateY(Math.atan2(-position.x, 50))
                enemy.rotateX((-8 * Math.PI) / 20)
                enemy.setPosition(position)
            }
        }
    }

    tick(delta) {
        for (const enemy of this.enemies) {
            enemy.tick(delta)
        }
    }
}

export { EnemyWave }
