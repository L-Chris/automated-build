import Router from 'koa-router'
import ModuleController from '../../controllers/module'
const router = Router()

router.get('/list', ModuleController.find)
router.get('/get/:id', ModuleController.findOne)
router.post('/save', ModuleController.save)
router.post('/delete/:id', ModuleController.remove)

export default router