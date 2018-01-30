import fs from 'fs'
import git from 'simple-git/promise'
import cuid from 'cuid'
import {backups} from '../const'
import Project from '../mongodb/models/project'
import Backup from '../mongodb/models/backup'
import BaseController from './base'

const initRepo = (git, remote) => git.init().then(() => git.addRemote('origin', remote))
const findRepoBranch = async project => {
  const path = `./projects/${project.id}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  const inst = git(path)
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
    let {id, name, url} = requestBody
    id = id || cuid()
    let data = await Project.findOneAndUpdate({id}, {id, name, url}, {new: true, upsert: true})
    ctx.body = data
  }
  // 删除项目信息
  static async remove(ctx, next) {
    let {id} = ctx.params
    let res = await Project.remove({ id })
    ctx.body = res
  }
  // 获取项目信息
  static async findOne(ctx, next) {
    let {id} = ctx.params
    let res = await Project.findOne({id})
    ctx.body = res
  }
  // 获取项目列表
  static async find(ctx, next) {
    let {name = ''} = ctx.query
    let content = await Project.find({name: new RegExp(name)})
    content = await Promise.all(content.map(_ => findRepoBranch(_._doc)))
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
    let {id} = ctx.query
    let content = await Backup.find({projectId: id})
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    }
  }
  static async setBackup (ctx, next) {
    let requestBody = ctx.request.body
    let {id, backupId} = requestBody
    let backup = await Backup.findOne({id: backupId, projectId: id})
    let res = await Project.findOneAndUpdate({id}, {$set: { backup }})
    ctx.body = res
  }
}

export default ProjectController