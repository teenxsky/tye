<template>
    <Start v-if="state.currentMenuScene === 'start'" />
</template>

<script lang="ts">
import { state } from '@renderer/components/Composable.js'
import Start from '@renderer/components/Start.vue'

export default {
    name: 'Menu',
    components: {
        Start,
    },
    setup() {
        return {
            state,
        }
    },
}
</script>

<style></style>
