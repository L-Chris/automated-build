import fs from 'fs'
import git from 'simple-git/promise'
import {projects, backups} from '../const'
import Project from '../mongodb/models/project'
import BaseController from './base'

const initRepo = (git, remote) => git.init().then(() => git.addRemote('origin', remote))
const findRepoBranch = async project => {
  const inst = git(`./projects/${project.id}`)
  let {all, current} = await inst.checkIsRepo()
    .then(isRepo => !isRepo && initRepo(inst, project.url))
    .then(() => inst.branch())
  return {
    ...project,
    current,
    branchList: all
  }
}

class ProjectController extends BaseController {
  constructor (params) {  
    super(params)

    this.name = params.name
    this.url = params.url
  }
  // 保存项目信息
  static async save(ctx, next) {
    let requestBody = ctx.request.body
    let {id: _id, name, url} = requestBody
    let data = await Project.findOneAndUpdate({_id}, {name, url}, {new: true, upsert: true})
    ctx.body = data
  }
  // 删除项目信息
  static async remove(ctx, next) {
    let {id: _id} = ctx.params
    let res = await Project.remove({ _id })
    ctx.body = res
  }
  // 获取项目信息
  static async findOne(ctx, next) {
    let {id: _id} = ctx.params
    let res = await Project.findOne({_id})
    ctx.body = res
  }
  // 获取项目列表
  static async find(ctx, next) {
    let {name = ''} = ctx.query
    let res = await Project.find({name: `/${name}/`})
    console.log(res)
    let content = await Promise.all(projects.filter(_ => _.name.includes(name)).map(_ => findRepoBranch(_)))
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    }
  }
  // 获取项目备份列表
  static async findBackUp(ctx, next) {
    ctx.body = {
      content: backups,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    }
  }
}

export default ProjectController