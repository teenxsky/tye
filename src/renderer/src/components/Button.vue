<template>
    <button
        :class="{ selected: isSelected }"
        @focus="handleFocus"
        class="shadow-blue"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    isSelected: Boolean,
})

const emits = defineEmits(['select', 'click'])

const handleFocus = () => {
    emits('select')
}
</script>

<style scoped>
button {
    font-family: 'Press Start 2P';
    margin: 1rem;
    color: white;
    background-color: transparent;
    font-size: 5rem;
    border: none;
}

button.selected {
    color: rgb(240, 255, 0);
    /* color: rgb(242, 37, 37); */
}
</style>
