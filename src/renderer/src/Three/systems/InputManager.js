class InputManager {
    constructor() {
        this.keys = {}
        this.keyMap = new Map()

        const addKey = (key, name) => {
            this.keys[name] = { pressed: false, justPressed: false }
            this.keyMap.set(key, name)
        }

        const setKey = (keyName, pressed) => {
            const keyState = this.keys[keyName]
            if (!keyState) {
                return
            }
            if (keyState.pressed !== pressed) {
                keyState.pressed = pressed
                keyState.justPressed = pressed
            }
        }

        const setKeyFromKey = (key, pressed) => {
            const keyName = this.keyMap.get(key)
            if (!keyName) {
                return
            }
            setKey(keyName, pressed)
        }

        addKey('ArrowLeft', 'left')
        addKey('ArrowRight', 'right')

        window.addEventListener('keydown', (e) => {
            setKeyFromKey(e.key, true)
        })
        window.addEventListener('keyup', (e) => {
            setKeyFromKey(e.key, false)
        })
    }

    tick(delta) {
        for (const keyState of Object.values(this.keys)) {
            if (keyState.justPressed) {
                keyState.justPressed = false
            }
        }
    }
}

export { InputManager }
