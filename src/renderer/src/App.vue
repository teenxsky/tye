<template>
    <Transition>
        <Menu v-if="state.currentScene === 'menu'" />
        <Game v-else-if="state.currentScene === 'game'" />
    </Transition>
</template>

<script lang="ts" setup>
import Menu from '@renderer/components/Menu.vue'
import Game from '@renderer/components/Game.vue'
import { state } from '@renderer/components/Scenes'
</script>

<style></style>
