<template>
    <div ref="sceneContainer" class="scene-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { StartScene } from '@renderer/Three/StartScene.jsx'

export default {
    name: 'ThreeStartScene',
    setup() {
        const sceneContainer = ref(null)

        const initScene = () => {
            const scene = new StartScene(sceneContainer.value)
            scene.start()
        }

        onMounted(() => {
            initScene()
        })

        return {
            sceneContainer,
        }
    },
}
</script>

<style>
.scene-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
