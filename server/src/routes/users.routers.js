import express from 'express'
import { Router } from 'express'
import { loginValidator, registerValidator } from '../middlewares/users.middlewares.js'
import { userController } from '../controllers/users.controllers.js'
import { wrapAsync } from '../utils/handler.js'
//tạo Router
const usersRouter = Router()

/*
    description: Register a new user
    path: /register
    method: POST
    body: {
        name: string,
        email: string,
        password: string,
        confirm_password: string,
        date_of_birth: string nhưng có dạng ISO8601
    }
 */
usersRouter.post('/register', registerValidator, wrapAsync(userController.register))

usersRouter.post('/login', loginValidator, userController.login)

usersRouter.get('/:id', userController.getUserProfile)

export default usersRouter
