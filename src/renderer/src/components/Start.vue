<template>
    <div class="start-container">
        <div class="logo-container">
            <div class="shadow-wrapper">
                <h1 data-text="TELL YOUR ENEMIES" class="start-title">
                    tell your enemies
                </h1>
            </div>
        </div>
        <h3 class="blink non-highlighted">PRESS ENTER TO CONTINUE</h3>
        <h4>©<span class="non-highlighted">2024</span> Tell Your Friends</h4>
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
        },
    }
</script>

<style scoped>
    .start-title {
        font-size: min(8vw, 8rem);
        background-image: linear-gradient(
            180deg,
            rgb(190, 0, 0),
            rgb(190, 0, 0) 10%,

            rgb(210, 0, 0),
            rgb(210, 0, 0) 20%,

            rgb(230, 0, 0) 20%,
            rgb(230, 0, 0) 40%,

            rgb(255, 0, 0) 40%,
            rgb(255, 0, 0) 60%,

            rgb(230, 0, 0) 60%,
            rgb(230, 0, 0) 80%,

            rgb(210, 0, 0) 80%,
            rgb(210, 0, 0) 90%,

            rgb(190, 0, 0) 90%,
            rgb(190, 0, 0)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        text-transform: uppercase;
        max-width: 90vw;
        word-wrap: break-word;
        text-align: center;
        margin: 0 auto;
        margin-top: min(4vw, 4rem);
        /* animation: jump 1s linear infinite; */
    }

    .start-title:after {
        content: attr(data-text);
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        text-shadow:
            calc(-0.08vw) calc(-0.08vw) 0 rgb(240, 255, 0),
            calc(0.08vw) calc(-0.08vw) 0 rgb(240, 255, 0),
            calc(-0.08vw) calc(0.08vw) 0 rgb(240, 255, 0),
            calc(0.16vw) calc(0.16vw) 0 rgb(240, 255, 0),
            0 calc(0.4vw) 0 rgb(50, 90, 230),
            calc(-0.16vw) calc(0.4vw) 0 rgb(50, 90, 230),
            calc(0.16vw) calc(0.4vw) 0 rgb(50, 90, 230),
            0 calc(0.8vw) 0 rgb(0, 0, 240),
            calc(-0.16vw) calc(0.8vw) 0 rgb(0, 0, 240),
            calc(0.16vw) calc(0.8vw) 0 rgb(0, 0, 240),
            0 calc(1.2vw) 0 rgb(0, 0, 150),
            calc(0.16vw) calc(1.2vw) 0 rgb(0, 0, 150),
            calc(-0.16vw) calc(1.6vw) 0 rgb(0, 0, 150),
            0 calc(2vw) 0 rgb(0, 0, 100),
            calc(0.16vw) calc(2vw) 0 rgb(0, 0, 100),
            calc(-0.16vw) calc(2vw) 0 rgb(0, 0, 100),
            0 calc(1.6vw) 0 rgb(0, 0, 100),
            calc(0.16vw) calc(1.6vw) 0 rgb(0, 0, 100),
            calc(-0.16vw) calc(1.6vw) 0 rgb(0, 0, 100);
        top: 0;
        z-index: -1;
        max-width: 90vw;
        word-wrap: break-word;
        width: 100%;
        text-align: center;
    }

    .start-container {
        font-family: 'Press Start 2P';
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        padding: 1rem;
        box-sizing: border-box;
    }

    .shadow-wrapper {
        transform: scaleY(1.5) perspective(20vw) rotateX(15deg) scaleX(1);
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-family: 'JMH';
        font-size: min(4vw, 4rem);
        letter-spacing: min(0.8vw, 0.8rem);
        margin: 0 auto;
        width: fit-content;
        color: transparent;
        max-width: 100%;
        text-align: center;
    }

    .tm {
        text-justify: none;
        display: inline-block;
        font-size: min(0.8vw, 0.8rem);
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
        text-align: center;
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
        text-align: center;
    }

    h3 {
        font-size: min(2.5vw, 2.5rem);
        margin: 0 auto;
        margin-top: min(15vw, 15rem);
        color: white;
        text-align: center;
    }

    h4 {
        font-size: min(1.5vw, 1.5rem);
        opacity: 0.9;
        margin: 0 auto;
        margin-top: min(8vw, 8rem);
        margin-bottom: min(2vw, 2rem);
        color: white;
        text-align: center;
        letter-spacing: 0.2rem;
    }

    .blink {
        animation: blink 2s linear infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.3;
        }

        100% {
            opacity: 1;
        }
    }

    .jump {
        animation: jump 0.5s linear infinite;
    }

    @keyframes jump {
        0% {
            font-size: min(8vw, 8rem);
        }

        50% {
            font-size: min(8.4vw, 8.4rem);
        }

        100% {
            font-size: min(8vw, 8rem);
        }
    }

    .scene-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
