import cuid from 'cuid'
import Role from '../mongodb/models/role'
import Module from '../mongodb/models/module'
import BaseController from './base'

class RoleController extends BaseController {
  constructor (params) {  
    super(params)
  }
  // 保存角色信息
  static async save(ctx, next) {
    let requestBody = ctx.request.body
    let {id, name, description, level, moduleIds = ''} = requestBody
    id = id || cuid()
    moduleIds = moduleIds ? moduleIds.split(',') : []
    let modules = await Module.find({
      id: { $in: moduleIds }
    })
    let res = await Role.findOneAndUpdate({id}, {id, name, description, level, modules}, {new: true, upsert: true})
    ctx.body = res
  }
  // 删除角色信息
  static async remove(ctx, next) {
    let {id} = ctx.params
    let res = await Role.remove({ id })
    ctx.body = res
  }
  // 获取角色信息
  static async findOne(ctx, next) {
    let {id} = ctx.params
    let res = await Role.findOne({ id })
    ctx.body = res
  }
  // 获取角色列表
  static async find(ctx, next) {
    let {name} = ctx.query
    let content = await Role.find({name: new RegExp(name)})
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    }
  }
}

export default RoleController