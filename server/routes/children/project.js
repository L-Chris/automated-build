import Router from 'koa-router'
import ProjectController from '../../controllers/project'
const router = Router()

router.get('/list', ProjectController.find)
router.get('/get', ProjectController.findOne)
router.post('/save', ProjectController.save)
router.post('/delete/:id', ProjectController.remove)
router.get('/backup/list', ProjectController.findBackUp)
router.post('/backup/update', ProjectController.setBackup)
// router.get('/build', async (ctx, next) => {
//   ctx.type = 'json'
//   let {id} = ctx.query
//   let message
//   const project = projects.find(_ => _.id === id)
//   try {
//     const inst = git(`./projects/${project.id}`)
//     // init reposity
//     await inst.checkIsRepo()
//       .then(isRepo => !isRepo && initRepo(inst, project.url))
//       .then(() => inst.fetch())
//       // .then(() => inst.pull('origin', 'develop'))
//     message = await inst.branch()
//   }
//   catch (e) {
//     console.error('failed: ', e)
//     message = 'error'
//   }
//   ctx.body = message
// })

export default router