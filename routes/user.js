import express from 'express'
import userController from '../controllers/User.js'
import authMiddleware from "../middleware/authMiddleware.js";

const router = new express.Router()

router.post('/auth/registration', userController.registration)
router.post('/auth/login', userController.login)


router.get('/clients', authMiddleware, userController.getAll)
router.get('/clients/:id', authMiddleware, userController.getUserById)
router.post('/clients', authMiddleware, userController.getStatusByIds)

export default router