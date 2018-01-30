import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.mongodb.url)
const db = mongoose.connection

db.on('error', err => {
  console.log('数据库连接失败：' + err)
})
db.once('open', () => {
  console.log('数据库连接成功')
})
db.on('disconnected', () => {
  console.log('数据哭连接断开')
})
