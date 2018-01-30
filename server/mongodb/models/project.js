import mongoose from 'mongoose'
import ProjectSchema from '../schemas/project'

const Project = mongoose.model('Project', ProjectSchema)

export default Project