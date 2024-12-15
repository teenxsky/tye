import dotenv from 'dotenv'
import mgPkg from 'mongoose'
import express from 'express'
import bpPkg from 'body-parser'
import secureRoutes from './routes/secure.js'
import cors from 'cors'

dotenv.config()
const { MONGO_URI } = process.env
const PORT = process.env.VITE_PORT
const { urlencoded, json } = bpPkg
const { connect, connection } = mgPkg

const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 1000,
}

// TODO: delete await and log's when releasing app
const connectDB = async () => {
    try {
        await connect(MONGO_URI, mongooseOptions)
        console.log('Connected to MongoDB Atlas')
    } catch (error) {
        await connection.close()
        console.error('MongoDB connection error')
    }
}

let server
const app = express()

const startServer = () => {
    server = app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
    return server
}
// TODO: delete this line when releasing app
// startServer()

const monitorConnection = async () => {
    if (connection.readyState === 0) {
        connectDB()
    }
}

let connectionMonitor = null

await connectDB()
if (connection.readyState !== 0) {
    connectionMonitor = setInterval(monitorConnection, 2000)
}

connection.on('error', async (error) => {
    if (connection.readyState === 1) {
        connection.close()
    }
})

connection.on('timeout', async () => {
    console.log('MongoDB connection timeout')
    connection.close()
})

app.use(
    cors({
        origin: [`http://localhost:${PORT}`, `http://localhost:5173`],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'x-signature',
            'x-api-key',
            'x-request-id',
            'x-timestamp',
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, x-signature, x-timestamp, x-api-key'
    )
    next()
})

app.use(json())
app.use(urlencoded({ extended: false }))

app.use('/', secureRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'

    console.error(`Error ${status}: ${message}`)
    if (err.stack) console.error(err.stack)
})

// TODO: delete process.exit when releasing app
const stopServer = async () => {
    console.log('Server is closing...')
    try {
        clearInterval(connectionMonitor)
        if (server) {
            await server.close()
        }
        await connection.close()
        console.log('Database connection closed')
        process.exit(0)
    } catch (error) {
        console.error('Error while closing database:', error)
        process.exit(1)
    }
}

process.on('SIGTERM', () => {
    console.log('SIGTERM received')
    stopServer()
})

process.on('SIGINT', () => {
    console.log('SIGINT received')
    stopServer()
})

process.on('SIGQUIT', () => {
    console.log('SIGINT received')
    stopServer()
})

export { startServer, stopServer }
