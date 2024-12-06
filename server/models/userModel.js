import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    highScore: {
        type: Number,
        default: 0,
    },
})

UserSchema.pre('save', async function (next) {
    const user = this
    next()
})

const UserModel = mongoose.model('player', UserSchema)

export default UserModel