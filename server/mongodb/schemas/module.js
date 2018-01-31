import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Module = new Schema({
  id: {type: String, unique: true},
  parentId: {type: String},
  name: {type: String},
  description: {type: String}
})

export default Module
