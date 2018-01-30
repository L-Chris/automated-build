import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Project = new Schema({
	id: {type: String, unique: true},
	name: {type: String},
	url: {type: String},
	backup: {
		id: String,
		name: String,
		createTime: Date
	}
})

export default Project
