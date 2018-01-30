import mongoose from 'mongoose'
import UserSchema from '../schemas/user'

const User = mongoose.model('Project', UserSchema)

export default User