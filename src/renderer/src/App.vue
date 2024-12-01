<template>
    <Menu v-if="state.currentScene === 'menu'" />
</template>

<script lang="ts" setup>
import Menu from '@renderer/components/Menu.vue'
import { state } from '@renderer/components/Composable'
</script>

<style></style>
