import express from 'express'
import user from './user.js'
import router from './user.js'

const router = new express.Router()
router.use('/', user)

export default router