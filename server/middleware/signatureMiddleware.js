import crypto from 'crypto'
import dotenv from 'dotenv'
import { createStringToSign } from '../tools/signatureUtils.js'

dotenv.config()
const { PUBLIC_KEY } = process.env

// const usedRequestIds = new Map()

// TODO: добавить node-cache, чтобы кешировать requestId
// setInterval(() => {
//     const fiveSecondsAgo = Date.now() - 5 * 1000
//     for (const [requestId, timestamp] of usedRequestIds) {
//         if (timestamp < fiveSecondsAgo) {
//             usedRequestIds.delete(requestId)
//         }
//     }
// }, 30 * 1000)

function validateSignature(req, res, next) {
    try {
        const signature = req.headers['x-signature']
        const timestamp = req.headers['x-timestamp']
        const requestId = req.headers['x-request-id']
        const apiKey = req.headers['x-api-key']

        if (!signature || !timestamp || !requestId || !apiKey) {
            return res.status(401).json({
                error: 'Missing required headers',
                received: { signature, timestamp, requestId, apiKey },
            })
        }

        const headers = {
            'content-type': req.headers['content-type'],
            'x-api-key': apiKey,
            'x-request-id': requestId,
            'x-timestamp': timestamp,
        }

        const body = JSON.stringify(req.body)

        const stringToVerify = createStringToSign(
            req.method,
            req.path,
            timestamp,
            requestId,
            headers,
            body
        )

        const verifier = crypto.createVerify('SHA256')
        verifier.update(stringToVerify)

        const isValid = verifier.verify(PUBLIC_KEY, signature, 'base64')

        if (!isValid) {
            return res.status(401).json({
                error: 'Invalid signature',
            })
        }

        next()
    } catch (error) {
        console.error('Signature validation error:', error)
        return res.status(500).json({
            error: 'Signature validation failed',
            message: error.message,
        })
    }
}

export default validateSignature
