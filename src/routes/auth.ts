import express, { Request, Response } from 'express'
import { check } from 'express-validator'
import { validateUser, users, user, login, update, deleteU } from '../controller/auth.controller'
import { checkAdmin } from '../middleware/checkAdmin'
import { checkAuth } from '../middleware/checkAuth'

const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
    res.send("Auth route is working")
})

router.post('/signup', 
           [check("email", "Please input a valid email").isEmail(), 
            check("password", "Please input a password with min length of 6").isLength({min: 6})],
            validateUser
)

router.post('/login', login)

router.get('/user/:userId', checkAdmin, user)

router.get('/users', checkAdmin, users)

router.patch('/update/:userId', checkAuth, update)

router.delete('/delete/:userId', checkAdmin, deleteU)

export = router