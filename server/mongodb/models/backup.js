import mongoose from 'mongoose'
import BackupSchema from '../schemas/backup'

const Backup = mongoose.model('Backup', BackupSchema)

export default Backup