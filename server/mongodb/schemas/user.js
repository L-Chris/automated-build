import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
	id: {type: String, unique: true},
	account: {type: String},
	password: {type: String},
	avatar: {type: String},
	name: {type: String},
	role: {
		id: String,
		name: String,
		description: String,
		level: Number,
		modules: [{
			id: String,
			parentId: String,
			name: String,
			description: String
		}]
	}
})

export default User
