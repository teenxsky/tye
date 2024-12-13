<template>
    <div class="menu-container">
        <Transition>
            <Start v-if="state.currentMenuScene === 'start'" />
            <Options v-else-if="state.currentMenuScene === 'options'" />
            <Settings v-else-if="state.currentMenuScene === 'settings'" />
            <Highscores v-else-if="state.currentMenuScene === 'highscores'" />
            <LostConnection v-else-if="state.currentMenuScene === 'lost-connection'" />
        </Transition>
        <div ref="sceneContainer" class="scene-container"></div>
    </div>
</template>

<script lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { state } from '@renderer/components/Scenes'
    import { loadSettings } from '@renderer/components/Settings'
    import Start from '@renderer/components/Start.vue'
    import Options from '@renderer/components/Options.vue'
    import Settings from '@renderer/components/Settings.vue'
    import { MenuScene } from '@renderer/Three/MenuScene.jsx'
    import Highscores from '@renderer/components/Highscores.vue'
    import LostConnection from '@renderer/components/LostConnection.vue'

    export default {
        name: 'Menu',
        components: {
            Start,
            Options,
            Settings,
            Highscores,
            LostConnection,
        },
        setup() {
            const sceneContainer = ref<HTMLDivElement | null>(null)
            let scene = ref<MenuScene | null>(null)

            const initScene = () => {
                scene = new MenuScene(sceneContainer.value)
                scene.start()
            }

            onMounted(() => {
                loadSettings()
                initScene()
            })

            onUnmounted(() => {
                scene.stop()
            })

            return {
                state,
                sceneContainer,
            }
        },
    }
</script>

<style></style>
