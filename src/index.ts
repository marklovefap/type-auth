import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth'
import post from './routes/post'
import admin from './routes/admin'

// mongo connected & start server
mongoose
    .connect('mongodb://127.0.0.1:27017/jwt')
    .then(() => {
       console.log('Mongoose connected')
    }).then(() =>{
        app.listen(4000, () => {
            console.log('Server running at port 4000')
        })
    })

// set server
const app = express()

// set data
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// call auth routes
app.use('/auth', auth)
app.use('/post', post)
app.use('/admin', admin)

// health check
app.get('/', (req: Request, res: Response) => {
    res.send("I am working on project")
})








