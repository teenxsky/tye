<template>
    <div class="start-container">
        <div class="logo-container">
            <div class="shadow-wrapper">
                <h1 data-text="TELL YOUR ENEMIES" class="start-title">
                    tell your enemies
                </h1>
            </div>
        </div>
        <h3 class="blink shadow-blue">PRESS ENTER TO CONTINUE</h3>
        <h4>©<span class="shadow-blue">2024</span> Tell Your Friends</h4>
    </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { setMenuScene } from '@renderer/components/Scenes'
import { playSound, keyEnterSound } from '@renderer/components/Audio'

export default {
    name: 'Start',
    components: {},
    setup() {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                setMenuScene('options')
                playSound(keyEnterSound)
            }
        }

        onMounted(() => {
            window.addEventListener('keydown', handleKeyPress)
        })

        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeyPress)
        })

        return {
            handleKeyPress,
        }
    },
}
</script>

<style>
.start-title {
    font-size: 10rem;
    background-image: linear-gradient(
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
    -webkit-text-fill-color: transparent;
    position: relative;
    text-transform: uppercase;
}

.start-title:after {
    content: attr(data-text);
    left: 0;
    position: absolute;
    text-shadow:
        -1px -1px 0 rgb(240, 255, 0),
        1px -1px 0 rgb(240, 255, 0),
        -1px 1px 0 rgb(240, 255, 0),
        1px 1px 0 rgb(240, 255, 0),
        0 5px 0 rgb(0, 0, 240),
        0 10px 0 rgb(0, 0, 240),
        0 15px 0 rgb(0, 0, 150),
        0 20px 0 rgb(0, 0, 150),
        0 25px 0 rgb(0, 0, 100),
        0 20px 0 rgb(0, 0, 100);

    top: 0;
    z-index: -1;
}

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
    transform: scaleY(1.5) perspective(20rem) rotateX(15deg) scaleX(1);
}

h1 {
    font-family: 'JMH';
    font-size: 5rem;
    letter-spacing: 1rem;
    margin: 0;
    width: fit-content;
    color: transparent;
    /* transform: scaleY(1.5) perspective(20rem) rotateX(15deg); */
}

.tm {
    text-justify: none;
    display: inline-block;
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

h3 {
    font-size: 3rem;
    margin: 0;
    margin-top: 18rem;
    color: white;
}

h4 {
    font-size: 2rem;
    opacity: 0.9;
    margin: 0;
    margin-top: 10rem;
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
