import Router from 'koa-router'
import project from './children/project'
import user from './children/user'
import role from './children/role'
import module from './children/module'
const router = Router()

router.use('/project', project.routes(), project.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/role', role.routes(), role.allowedMethods())
router.use('/module', module.routes(), module.allowedMethods())

export default router
