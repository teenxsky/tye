import { Enemy } from './Enemy.js'
import * as THREE from 'three'
import enemyModel_1 from '@renderer/assets/fighters/fighter02/result.gltf'
import enemyModel_2 from '@renderer/assets/fighters/fighter03/result.gltf'
import enemyModel_3 from '@renderer/assets/fighters/fighter04/result.gltf'
import enemyModel_4 from '@renderer/assets/fighters/fighter05/result.gltf'

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

        this.waveSpeed = 1
        this.elapsedTime = 0

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
            let enemies = []
            for (let j = 0; j < this.cols; j++) {
                const enemy = this.enemyModels[i][j]

                enemy.reset()
                // this.enemiesOnTheScene.push(enemy)
                enemies.push(enemy)

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
            this.enemiesOnTheScene.push(enemies)
            console.log(this.enemiesOnTheScene)
            maxX += 8
        }

        this.startShooting(shootingInterval)
    }

    startShooting(shootingInterval) {
        for (let j = 0; j < this.cols; j++) {
            for (let i = 0; i < this.rows; i++) {
                const enemy = this.enemiesOnTheScene[i][j]
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
        // Увеличение скорости со временем для динамики
        this.waveSpeed = Math.min(this.waveSpeed + 0.1 * delta, 5) // Макс. скорость: 5
        // Цикл по всем врагам
        for (let i = 0; i < this.enemiesOnTheScene.length; i++) {
            for (let j = 0; j < this.enemiesOnTheScene[i].length; j++) {
                const enemy = this.enemiesOnTheScene[i][j]
                if (!enemy.visible) continue

                // Смещение волны по оси X (синусоида)
                const waveOffsetX =
                    Math.sin(enemy.position.z * 0.5 + this.elapsedTime) * 5

                // Движение к игроку по оси Z
                const velocityZ = new THREE.Vector3(0, 0, this.waveSpeed)

                // Установка новой позиции
                enemy.position.x += waveOffsetX * delta // Волнообразное движение
                enemy.position.add(velocityZ.multiplyScalar(delta)) // Движение вперед
            }
        }

        // Увеличение времени для синусоиды
        this.elapsedTime += delta
    }

    tick(delta) {}
}

export { EnemyWave }
