require('dotenv').config()
const crypto = require('crypto')

const API_KEY = import.meta.env.VITE_API_KEY
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY

function createStringToSign(method, path, timestamp, requestId, headers, body) {
    const canonicalHeaders = Object.keys(headers)
        .sort()
        .map((key) => `${key}:${headers[key]}`)
        .join('\n')

    const bodyHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(body))
        .digest('hex')

    return [
        method.toUpperCase(),
        path,
        timestamp,
        requestId,
        canonicalHeaders,
        bodyHash,
    ].join('\n')
}

function makeSignature(
    method,
    path,
    body = '{}',
    timestamp = new Date().toISOString()
) {
    const requestId = crypto.randomBytes(16).toString('hex')

    const headers = {
        'content-type': 'application/json',
        'x-api-key': API_KEY,
        'x-request-id': requestId,
        'x-timestamp': timestamp,
    }

    const stringToSign = createStringToSign(
        method,
        path,
        timestamp,
        requestId,
        headers,
        body
    )

    const signer = crypto.createSign('SHA256')
    signer.update(stringToSign)

    const signature = signer.sign(PRIVATE_KEY, 'base64')

    return {
        signature,
        timestamp,
        requestId,
        headers,
    }
}

export { makeSignature, createStringToSign }
