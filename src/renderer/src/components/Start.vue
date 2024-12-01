<template>
    <div class="start-container">
        <div class="logo-container">
            <div class="shadow-wrapper">
                <h1 class="cs-2">
                    TELL YOUR <br />
                    ENEMIES
                    <!-- <span class="tm">TM</span> -->
                </h1>
            </div>
        </div>
        <h3 class="blink shadow-blue">PRESS ENTER TO CONTINUE</h3>
        <h4>©<span class="shadow-blue">2024</span> Tell Your Friends</h4>
    </div>
    <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { StartScene } from '@renderer/Three/StartScene.jsx'
import {
    state,
    keyEnterSound,
    keySound,
    startTheme,
} from '@renderer/components/Composable.js'

export default {
    name: 'Start',
    components: {
        StartScene,
    },
    setup() {
        let sceneContainer = ref(null)

        const initScene = () => {
            const scene = new StartScene(sceneContainer.value)
            scene.start()
        }

        const handleKeyPress = (event: KeyboardEvent) => {
            console.log(event.key)
            if (event.key === 'Enter') {
                keyEnterSound.cloneNode(true).play()
                state.value.currentMenuScene = 'start'
            } else {
                keySound.cloneNode(true).play()
            }
        }

        onMounted(() => {
            initScene()
            startTheme.play()
            window.addEventListener('keydown', handleKeyPress)
        })

        onUnmounted(() => {
            startTheme.stop()
            state.value.currentMenuScene = 'options'
            window.removeEventListener('keydown', handleKeyPress)
        })

        return {
            handleKeyPress,
            sceneContainer,
        }
    },
}
</script>

<style>
.start-container {
    font-family: 'Press Start 2P';
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10;
}

.shadow-wrapper {
    filter: drop-shadow(-1px -1px 0 rgb(240, 255, 0))
        drop-shadow(1px -1px 0 rgb(240, 255, 0))
        drop-shadow(-1px 1px 0 rgb(240, 255, 0))
        drop-shadow(1px 1px 0 rgb(240, 255, 0))
        drop-shadow(0 5px 0px rgb(10, 0, 255))
        drop-shadow(0 10px 0px rgb(10, 0, 255))
        drop-shadow(0 5px 0px rgb(5, 0, 140))
        drop-shadow(0 10px 0px rgb(5, 0, 140))
        drop-shadow(0 5px 0px rgb(3, 0, 95))
        drop-shadow(0 10px 0px rgb(3, 0, 95));
}

h1 {
    font-family: 'JMH';
    font-size: 8rem;
    letter-spacing: 1rem;
    margin: 0;
    width: fit-content;
    color: transparent;
    transform: scaleY(1.5) perspective(20rem) rotateX(15deg);
}

.tm {
    font-size: 1rem;
    color: white;
    transform: skewY(-5deg) scaleY(1.2) scaleX(0.8);
}

.cs-1 {
    background: linear-gradient(
        180deg,
        #e69d37,
        #e69d37 20%,

        #dd512c 20%,
        #dd512c 40%,

        #d6302f 40%,
        #d6302f 60%,

        #9c1d34 60%,
        #9c1d34 80%,

        #5c1d6e 80%,
        #5c1d6e
    );
    background-clip: text;
    -webkit-background-clip: text;
}

.cs-2 {
    background: linear-gradient(
        180deg,
        rgb(178, 30, 30),
        rgb(178, 30, 30) 10%,

        rgb(191, 28, 28),
        rgb(191, 28, 28) 20%,

        rgb(217, 35, 35) 20%,
        rgb(217, 35, 35) 40%,

        rgb(242, 37, 37) 40%,
        rgb(242, 37, 37) 60%,

        rgb(217, 35, 35) 60%,
        rgb(217, 35, 35) 80%,

        rgb(191, 28, 28) 80%,
        rgb(191, 28, 28) 90%,

        rgb(178, 30, 30) 90%,
        rgb(178, 30, 30)
    );
    background-clip: text;
    -webkit-background-clip: text;
}

.shadow-blue {
    text-shadow: rgb(5, 0, 255) 3px 3px 0;
}

h3 {
    font-size: 2rem;
    margin: 0;
    margin-top: 18rem;
    color: white;
}

h4 {
    font-size: 1.5rem;
    opacity: 0.9;
    margin: 0;
    margin-top: 8rem;
    margin-bottom: 3rem;
    color: white;
}

.blink {
    animation: blink 2s linear infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

.scene-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
