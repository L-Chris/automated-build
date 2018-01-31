import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
	id: {type: String, unique: true},
	account: {type: String, unique: true},
	password: {type: String},
	avatar: {type: String},
	name: {type: String},
	role: {
		id: String,
		name: String,
		level: Number,
		modules: Array
	},
})

export default User
