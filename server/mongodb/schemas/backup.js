import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Backup = new Schema({
  id: {type: String, unique: true},
  projectId: {type: String},
  name: {type: String},
  branch: {
    id: String,
    name: String
  },
	createTime: {type: Date}
})

export default Backup
