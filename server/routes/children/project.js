import fs from 'fs'
import Router from 'koa-router'
import git from 'simple-git/promise'
import {projects} from '../../const'
const router = Router()

const initRepo = (git, remote) => git.init().then(() => git.addRemote('origin', remote))
const findRepoBranch = async project => {
  const inst = git(`./projects/${project.id}`)
  let {all, current} = await inst.checkIsRepo()
    .then(isRepo => !isRepo && initRepo(inst, project.url))
    // .then(() => inst.fetch())
    .then(() => inst.branch())
  return {
    ...project,
    current,
    branchList: all
  }
}

router.get('/list', async (ctx, next) => {
  ctx.type = 'json'
  let content = []
  let list = await Promise.all(projects.map(_ => findRepoBranch(_)))
  ctx.body = {
    content: list,
    number: 1,
    total: 1,
    size: 10,
    totalElements: 10
  }
  console.log(ctx.body)
})

router.get('/build', async (ctx, next) => {
  ctx.type = 'json'
  let {id} = ctx.query
  let message
  const project = projects.find(_ => _.id === id)
  try {
    const inst = git(`./projects/${project.id}`)
    // init reposity
    await inst.checkIsRepo()
      .then(isRepo => !isRepo && initRepo(inst, project.url))
      .then(() => inst.fetch())
      // .then(() => inst.pull('origin', 'develop'))
    message = await inst.branch()
  }
  catch (e) {
    console.error('failed: ', e)
    message = 'error'
  }
  ctx.body = message
})
export default router