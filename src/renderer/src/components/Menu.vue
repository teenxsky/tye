<template>
    <Transition>
        <Start v-if="state.currentMenuScene === 'start'" />
        <Options v-else-if="state.currentMenuScene === 'options'" />
        <Settings v-else-if="state.currentMenuScene === 'settings'" />
    </Transition>
    <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { state, setMenuScene } from '@renderer/components/Composable.js'
import Start from '@renderer/components/Start.vue'
import Options from '@renderer/components/Options.vue'
import Settings from '@renderer/components/Settings.vue'
import { MenuScene } from '@renderer/Three/MenuScene.jsx'

export default {
    name: 'Menu',
    components: {
        Start,
        Options,
        Settings,
    },
    setup() {
        const sceneContainer = ref<HTMLDivElement | null>(null)

        const initScene = () => {
            const scene = new MenuScene(sceneContainer.value)
            scene.start()
        }

        onMounted(() => {
            setMenuScene('start')
            initScene()
        })

        return {
            state,
            sceneContainer,
        }
    },
}
</script>

<style></style>
