<template>
    <button
        :class="{ selected: isSelected }"
        @focus="handleFocus"
        class="non-highlighted"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
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
        color: rgb(240, 230, 20);
        text-shadow: rgb(250, 0, 10) 3px 3px 0;
    }
</style>
