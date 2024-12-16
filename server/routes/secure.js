import express from 'express'
import mongoose from 'mongoose'
import UserModel from '../models/userModel.js'
import asyncMiddleware from '../middleware/asyncMiddleware.js'
import signatureMiddleware from '../middleware/signatureMiddleware.js'

const router = express.Router()

const MAX_RECORDS = 10

router.post(
    '/submit-score',
    signatureMiddleware,
    asyncMiddleware(async (req, res, next) => {
        try {
            const { username, highScore } = req.body

            if (!username || !highScore) {
                return res.status(400).json({ error: 'Invalid data' })
            }

            const totalRecords = await UserModel.countDocuments()

            let minScore = 0
            if (totalRecords >= MAX_RECORDS) {
                const lowestScoreRecord = await UserModel.findOne()
                    .sort({ highScore: 1 })
                    .limit(1)
                minScore = lowestScoreRecord ? lowestScoreRecord.highScore : 0
            }

            const existingUser = await UserModel.findOne({ username })

            if (!existingUser) {
                if (totalRecords < MAX_RECORDS) {
                    const session = await mongoose.startSession()
                    try {
                        session.startTransaction()

                        await UserModel.create(
                            [
                                {
                                    username,
                                    highScore,
                                },
                            ],
                            { session }
                        )

                        await session.commitTransaction()
                    } catch (error) {
                        await session.abortTransaction()
                    } finally {
                        session.endSession()
                    }
                } else if (highScore >= minScore) {
                    const session = await mongoose.startSession()
                    try {
                        session.startTransaction()

                        await UserModel.findOneAndDelete(
                            { highScore: minScore },
                            { session }
                        )
                        await UserModel.create(
                            [
                                {
                                    username,
                                    highScore,
                                },
                            ],
                            { session }
                        )

                        await session.commitTransaction()
                    } catch (error) {
                        await session.abortTransaction()
                    } finally {
                        session.endSession()
                    }
                }
            }

            res.status(200).json()
        } catch {
            res.status(500).json()
        }
    })
)

router.get(
    '/scores',
    signatureMiddleware,
    asyncMiddleware(async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const users = await UserModel.find({}, 'username highScore -_id')
                .sort({ highScore: -1, username: 1 })
                .limit(MAX_RECORDS)

            res.status(200).json(users)
        } catch {
            res.status(500).json()
        }
    })
)

router.get(
    '/unique-username',
    signatureMiddleware,
    asyncMiddleware(async (req, res, next) => {
        try {
            const username = req.query.username
            const userExists = await UserModel.exists({ username: username })
            res.status(200).json(!userExists)
        } catch {
            res.status(500).json()
        }
    })
)

router.get(
    '/is-top',
    signatureMiddleware,
    asyncMiddleware(async (req, res, next) => {
        try {
            if (!req.query.highScore) {
                return res.status(400).json({ error: 'Invalid data' })
            }

            let isTop = true
            const highScore = req.query.highScore
            const totalRecords = await UserModel.countDocuments()

            if (totalRecords >= MAX_RECORDS) {
                const lowestScoreRecord = await UserModel.findOne()
                    .sort({ highScore: 1 })
                    .limit(1)
                let minScore = lowestScoreRecord
                    ? lowestScoreRecord.highScore
                    : -1
                isTop = highScore >= minScore
            } 
            
            res.status(200).json(isTop)
        } catch {
            res.status(500).json()
        }
    })
)

router.get(
    '/player-rank',
    signatureMiddleware,
    asyncMiddleware(async (req, res, next) => {
        try {
            if (!req.query.username || !req.query.highScore) {
                return res.status(400).json({ error: 'Invalid data' })
            }
            const username = req.query.username
            const highScore = req.query.highScore

            const position = await UserModel.countDocuments({
                $or: [
                    { highScore: { $gt: highScore } },
                    {
                        highScore: highScore,
                        username: { $lt: username },
                    },
                ],
            })
            const rank = position !== MAX_RECORDS ? position + 1 : position

            res.status(200).json(rank)
        } catch {
            res.status(500).json()
        }
    })
)

export default router
