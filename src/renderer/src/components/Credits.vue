<template>
    <div class="credits-container">
        <h1 class="non-highlighted">CREDITS</h1>
        <div class="credits-content">
            <div class="credit-section">
                <div class="credit-item">
                    <span class="name non-highlighted">KUTORGIN RUSLAN</span>
                </div>
                <div class="credit-item">
                    <span class="name non-highlighted">ROMAN SOKOLOVSKY</span>
                </div>
                <div class="credit-item">
                    <span class="name non-highlighted">ARTEM SVIRIN</span>
                </div>
            </div>
            <!-- <div class="credit-section">
                <h4>
                    ©<span class="non-highlighted">2024</span> Tell Your
                    Friends
                </h4>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
    import { onMounted, onUnmounted } from 'vue'
    import { setMenuScene } from '@renderer/components/Scenes'
    import { keyEnterSound, playSound } from '@renderer/components/Audio'

    export default {
        name: 'Credits',
        setup() {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === 'Escape' || event.key === 'Enter') {
                    playSound(keyEnterSound)
                    setMenuScene('options')
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
    .credits-container {
        font-family: 'Press Start 2P';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1;
        /* background: rgba(0, 0, 0, 0.5); */
    }

    h1 {
        font-size: min(5.5vw, 5.5rem);
        margin-bottom: 3rem;
        letter-spacing: 0.5rem;
    }

    .credits-content {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        text-align: center;
    }

    .credit-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.4);
    }

    h2 {
        font-size: min(3vw, 3rem);
        color: rgb(240, 230, 20);
        text-shadow: rgb(250, 0, 10) 3px 3px 0;
        letter-spacing: 0.3rem;
    }

    h4 {
        font-size: min(1.5vw, 1.5rem);
        opacity: 0.9;
        margin: 0 auto;
        margin-top: min(1.5vw, 1.5rem);
        margin-bottom: min(1.5vw, 1.5rem);
        color: white;
        text-align: center;
        letter-spacing: 0.2rem;
    }

    .credit-item {
        font-size: min(2vw, 2rem);
        margin: 0.5rem 0;
        transition: transform 0.2s ease;
    }

    .name {
        color: white;
        text-shadow: rgb(50, 90, 230) 3px 3px 0;
    }
</style>
