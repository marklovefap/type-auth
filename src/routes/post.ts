import express, { Request, Response } from 'express'
import { cPrivate, cPublic, dPrivate, dPublic, privatePost ,privatePosts, publicPost, publicPosts, uPrivate, uPublic } from '../controller/post.controller'
import { checkAuth } from '../middleware/checkAuth'

const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
    res.send("Post route is working")
})

router.get('/publics', publicPosts)

router.get('/public', publicPost)

router.get('/privates', checkAuth, privatePosts)

router.get('/private', checkAuth, privatePost)

router.post('/cPublic', cPublic) 

router.post('/cPrivate', cPrivate)

router.post('/uPublic', uPublic) 

router.post('/uPrivate', uPrivate)

router.post('/dPublic', dPublic) 

router.post('/dPrivate', dPrivate)

export = router