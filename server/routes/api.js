import Router from 'koa-router'
import project from './children/project'
import user from './children/user'
const router = Router()

router.use('/project', project.routes(), project.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

export default router
