import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Project = new Schema({
	name: {type: String},
	url: {type: String}
})

export default Project
