import Router from 'koa-router'
import UserController from '../../controllers/user'
const router = Router()

router.get('/list', UserController.find)
router.get('/get/:id', UserController.findOne)
router.post('/save', UserController.save)
router.post('/delete/:id', UserController.remove)

export default router