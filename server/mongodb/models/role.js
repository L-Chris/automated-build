import mongoose from 'mongoose'
import RoleSchema from '../schemas/role'

const Role = mongoose.model('Role', RoleSchema)

export default Role