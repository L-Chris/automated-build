import Router from 'koa-router'
import RoleController from '../../controllers/role'
const router = Router()

router.get('/list', RoleController.find)
router.get('/get/:id', RoleController.findOne)
router.post('/save', RoleController.save)
router.post('/delete/:id', RoleController.remove)

export default router