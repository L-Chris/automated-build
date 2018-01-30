import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
	account: {type: String, unique: true},
	password: {type: String}
})

export default User
