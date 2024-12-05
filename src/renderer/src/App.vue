<template>
    <Transition>
        <Menu v-if="state.currentScene === 'menu'" />
    </Transition>
</template>

<script lang="ts" setup>
import Menu from '@renderer/components/Menu.vue'
import { state } from '@renderer/components/Scenes'
</script>

<style></style>
