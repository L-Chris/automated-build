import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Role = new Schema({
	id: {type: String, unique: true},
  name: {type: String},
  description: {type: String},
  level: {type: Number},
  modules: [{
    id: String,
    parentId: String,
    name: String,
    description: String
  }]
})

export default Role
