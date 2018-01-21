import Router from 'koa-router'
import project from './children/project'
const router = Router()

router.use('/project', project.routes(), project.allowedMethods())

export default router
