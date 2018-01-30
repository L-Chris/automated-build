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
    let params = BaseController.filterObj(attrArr, ctx.request.body)

    let res = await User.findOneAndUpdate({account: params.account}, params, {new: true, upsert: true})

    ctx.success({data: res})
  }
  // 删除用户信息
  static async remove(ctx, next) {
    let {id} = ctx.params

    let res = await User.remove({ id: id })
    
    ctx.success({data: res})
  }
  // 获取用户信息
  static async findOne(ctx, next) {
    let {id} = ctx.params

    let res = await User.findOne({id: id})

    ctx.success({data: res})
  }
  // 获取用户列表
  static async find(ctx, next) {

    let res = await User.find()

    ctx.success({data: res})
  }
}

export default UserController