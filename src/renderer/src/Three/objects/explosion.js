import * as THREE from 'three'
import explosionPath from '@renderer/assets/effects/explosion.png'
import { explosions, playSound } from '@renderer/components/Audio'

function createExplosion(position, handlers, scale = 8) {
    let currentTile = 0
    let tilesAmount = 8

    const map = new THREE.TextureLoader().load(explosionPath)
    map.repeat.set(1 / tilesAmount, 1)
    map.magFilter = THREE.NearestFilter

    const material = new THREE.SpriteMaterial({ map })
    const explosion = new THREE.Sprite(material)

    explosion.position.copy(position)

    explosion.scale.set(scale, scale, scale)

    const animationSpeed = 0.1
    let elapsedTime = 0

    handlers.addObjectToScene(explosion)

    playSound(explosions[Math.floor(Math.random() * 3)])

    explosion.tick = (delta) => {
        elapsedTime += delta

        if (elapsedTime > animationSpeed) {
            elapsedTime = 0
            currentTile++

            if (currentTile >= tilesAmount) {
                handlers.removeObjectFromScene(explosion)
                explosion.material.dispose()
                explosion.geometry.dispose()
                return
            }
        }

        const offsetX = (currentTile % tilesAmount) / tilesAmount
        map.offset.set(offsetX, 0)
    }

    explosion.isAlive = () => currentTile < tilesAmount

    return explosion
}

export { createExplosion }
