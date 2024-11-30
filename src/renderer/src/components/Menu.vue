<template>
    <div class="menu-container">
        <h1>TELL YOUR ENEMIES</h1>
        <!-- <h2>PRESS ENTER TO CONTINUE</h2> -->
    </div>
    <ThreeStartScene />
</template>

<script>
import ThreeStartScene from '@renderer/components/ThreeStartScene.vue'

export default {
    name: 'Menu',
    components: {
        ThreeStartScene,
    },
    setup() {
        const handleAction = () => {
            alert('Menu button clicked!')
        }

        return {
            handleAction,
        }
    },
}
</script>

<style>
.menu-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10;
}

h1 {
    font-size: 3rem;
    text-align: center;
    color: red;
}

h2 {
    font-size: 2rem;
    text-align: center;
    color: white;
}

.ThreeStartScene {
    z-index: -1;
}
</style>
