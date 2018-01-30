import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
	id: {type: String, unique: true},
	account: {type: String, unique: true},
	password: {type: String}
})

export default User
