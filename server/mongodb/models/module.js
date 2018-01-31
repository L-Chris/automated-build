import mongoose from 'mongoose'
import ModuleSchema from '../schemas/module'

const Module = mongoose.model('Module', ModuleSchema)

export default Module