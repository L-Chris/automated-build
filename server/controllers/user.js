import cuid from 'cuid'
import User from '../mongodb/models/user'
import BaseController from './base'

class UserController extends BaseController {
  constructor (params) {  
    super(params)

    this.account = params.account
    this.password = params.password
  }
  // 保存用户信息
  static async save(ctx, next) {
    let requestBody = ctx.request.body
    let {id, name, avatar} = requestBody
    id = id || cuid()
    let res = await User.findOneAndUpdate({id}, {id, name, avatar}, {new: true, upsert: true})
    ctx.body = res
  }
  // 删除用户信息
  static async remove(ctx, next) {
    let {id} = ctx.params
    let res = await User.remove({ id })
    ctx.body = res
  }
  // 获取用户信息
  static async findOne(ctx, next) {
    let {id} = ctx.params
    let res = await User.findOne({ id })
    ctx.body = res
  }
  // 获取用户列表
  static async find(ctx, next) {
    let {name} = ctx.query
    let content = await User.find({name: new RegExp(name)})
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    }
  }
}

export default UserController