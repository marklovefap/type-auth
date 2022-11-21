import express, { Request, Response } from 'express'
import { check } from 'express-validator'
import { login, validateAdmin } from '../controller/admin.controller'

const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
    res.send("Admin route is working")
})

router.post('/signup', 
           [check("email", "Please input a valid email").isEmail(), 
            check("password", "Please input a password with min length of 6").isLength({min: 6})],
            validateAdmin
)

router.post('/login', login)

export = router