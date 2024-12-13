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

        this.enemyModels = {}
        this.enemiesOnTheScene = []

        // for (let i = 0; i < this.rows * this.cols; i++) {
        //     const url = this.enemyModelsURL[i % this.enemyModelsURL.length]
        //     const enemy = new Enemy(url, this.handlers, this.manager)
        //     enemy.scoreOnDestroy = this.enemyScores[url]
        //     this.enemyModels[url] = enemy
        // }

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

    generateWave(playerPosition = new THREE.Vector3(0, 0, 0)) {
        let maxX = 36
        for (let i = 0; i < this.rows; i++) {
            const spacing = (2 * maxX) / (this.cols - 1)
            for (let j = 0; j < this.cols; j++) {
                const enemy = this.enemyModels[i][j]

                enemy.reset()
                this.enemiesOnTheScene.push(enemy)

                const position = new THREE.Vector3(
                    -maxX + j * spacing,
                    -10,
                    -50 + playerPosition.z - i * 40
                )

                enemy.rotation = new THREE.Euler(
                    (-8 * Math.PI) / 20,
                    0,
                    Math.atan2(-position.x, 50)
                )

                enemy.position = position
            }
            maxX += 8
        }
    }

    tick(delta) {}
}

export { EnemyWave }
