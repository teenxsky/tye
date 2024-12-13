import { makeSignature } from '../tools/signatureUtils.js'
const PORT = import.meta.env.VITE_PORT

async function getScores(timeoutMs = 3500) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const method = 'GET'
        const path = '/scores'

        const { signature, headers } = makeSignature(method, path)
        const response = await fetch(`http://localhost:${PORT}${path}`, {
            method: method,
            headers: {
                ...headers,
                'x-signature': signature,
            },
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        const result = await response.json()
        if (response.status === 200) {
            return result
        } else {
            return null
        }
    } catch (error) {
        clearTimeout(timeoutId)
        if (error.name === 'AbortError') {
            console.error('Request timed out')
            return null
        } else {
            console.error('Error fetching scores:', error)
            return null
        }
    }
}

async function usernameIsUnique(username, timeoutMs = 3500) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const method = 'GET'
        const path = '/unique-username'
        const { signature, headers } = makeSignature(method, path)

        const response = await fetch(
            `http://localhost:${PORT}${path}?username=${username}`,
            {
                method: method,
                headers: {
                    ...headers,
                    'x-signature': signature,
                },
                signal: controller.signal,
            }
        )

        clearTimeout(timeoutId)

        const result = await response.json()
        if (response.status === 200) {
            return result
        } else {
            return null
        }
    } catch (error) {
        clearTimeout(timeoutId)
        if (error.name === 'AbortError') {
            console.error('Request timed out')
        } else {
            console.error('Error fetching scores:', error)
        }
        return null
    }
}

async function getPlayerRank(username, score, timeoutMs = 3500) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const method = 'GET'
        const path = '/player-rank'
        const { signature, headers } = makeSignature(method, path)

        const response = await fetch(
            `http://localhost:${PORT}${path}?username=${username}&highScore=${score}`,
            {
                method: method,
                headers: {
                    ...headers,
                    'x-signature': signature,
                },
                signal: controller.signal,
            }
        )

        clearTimeout(timeoutId)

        const result = await response.json()
        if (response.status === 200) {
            return result
        } else {
            return null
        }
    } catch (error) {
        clearTimeout(timeoutId)

        if (error.name === 'AbortError') {
            console.error('Request timed out')
        } else {
            console.error('Error fetching scores:', error)
        }
        return null
    }
}

async function isTopScore(score, timeoutMs = 3500) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const method = 'GET'
        const path = '/is-top'
        const { signature, headers } = makeSignature(method, path)

        const response = await fetch(
            `http://localhost:${PORT}${path}?&highScore=${score}`,
            {
                method: method,
                headers: {
                    ...headers,
                    'x-signature': signature,
                },
                signal: controller.signal,
            }
        )

        clearTimeout(timeoutId)

        const result = await response.json()
        if (response.status === 200) {
            return result
        } else {
            return null
        }
    } catch (error) {
        clearTimeout(timeoutId)

        if (error.name === 'AbortError') {
            console.error('Request timed out')
        } else {
            console.error('Error fetching scores:', error)
        }
        return null
    }
}

async function setScore(username, score, timeoutMs = 3500) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const method = 'POST'
        const path = '/submit-score'
        const strBody = JSON.stringify({ username: username, highScore: score })
        const { signature, headers } = makeSignature(method, path, strBody)

        const response = await fetch(`http://localhost:${PORT}${path}`, {
            method: method,
            headers: {
                ...headers,
                'x-signature': signature,
            },
            body: strBody,
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.status !== 200) {
            console.error('Error setting score:', response.status)
        }
        return true
    } catch (error) {
        clearTimeout(timeoutId)

        if (error.name === 'AbortError') {
            console.error('Request timed out')
        } else {
            console.error('Error setting score:', error)
        }
        return null
    }
}

export { getScores, usernameIsUnique, getPlayerRank, isTopScore, setScore }
