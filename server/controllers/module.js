import cuid from 'cuid'
import Module from '../mongodb/models/module'
import BaseController from './base'

class ModuleController extends BaseController {
  constructor (params) {  
    super(params)
  }
  // 保存模块信息
  static async save(ctx, next) {
    let requestBody = ctx.request.body
    let {id, parenId, name, description} = requestBody
    id = id || cuid()
    let res = await Module.findOneAndUpdate({id}, {id, parenId, name, description}, {new: true, upsert: true})
    ctx.body = res
  }
  // 删除模块信息
  static async remove(ctx, next) {
    let {id} = ctx.params
    let res = await Module.remove({ id })
    ctx.body = res
  }
  // 获取模块信息
  static async findOne(ctx, next) {
    let {id} = ctx.params
    let res = await Module.findOne({ id })
    ctx.body = res
  }
  // 获取模块列表
  static async find(ctx, next) {
    let {name} = ctx.query
    let content = await Module.find({name: new RegExp(name)})
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    }
  }
}

export default ModuleController