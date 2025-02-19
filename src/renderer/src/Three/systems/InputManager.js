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

            if (pressed && !keyState.pressed) {
                keyState.justPressed = 1
            }

            keyState.pressed = pressed
        }

        const setKeyFromKey = (key, pressed) => {
            const keyName = this.keyMap.get(key)
            if (!keyName) {
                return
            }
            setKey(keyName, pressed)
        }

        addKey('ArrowLeft', 'left')
        addKey('A', 'left')
        addKey('a', 'left')
        addKey('Ф', 'left')
        addKey('ф', 'left')
        addKey('ArrowRight', 'right')
        addKey('D', 'right')
        addKey('d', 'right')
        addKey('В', 'right')
        addKey('в', 'right')
        addKey(' ', 'shot') // Space

        window.addEventListener('keydown', (e) => {
            setKeyFromKey(e.key, true)
        })
        window.addEventListener('keyup', (e) => {
            setKeyFromKey(e.key, false)
        })
    }

    tick(delta) {
        for (const keyState of Object.values(this.keys)) {
            if (keyState.justPressed > 0) {
                keyState.justPressed++

                if (keyState.justPressed > 2) {
                    keyState.justPressed = 0
                }
            }
        }
    }
}

export { InputManager }
