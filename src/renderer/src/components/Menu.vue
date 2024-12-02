<template>
    <Transition @after-enter="onAfterEnter">
        <Start v-if="state.currentMenuScene === 'start'" />
        <Options v-else-if="state.currentMenuScene === 'options'" />
    </Transition>
    <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { state } from '@renderer/components/Composable.js'
import Start from '@renderer/components/Start.vue'
import Options from '@renderer/components/Options.vue'
import { MenuScene } from '@renderer/Three/MenuScene.jsx'

export default {
    name: 'Menu',
    components: {
        Start,
        Options,
    },
    setup() {
        const sceneContainer = ref<HTMLDivElement | null>(null)

        const initScene = () => {
            const scene = new MenuScene(sceneContainer.value)
            scene.start()
        }

        function onAfterEnter(el) {
            // isSceneChanged.value = true
        }

        onMounted(() => {
            initScene()
        })

        return {
            state,
            sceneContainer,
            onAfterEnter,
        }
    },
}
</script>

<style></style>
