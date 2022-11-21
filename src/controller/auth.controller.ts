import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import { IUser } from '../types'
import User from '../model/user.model'
import { findUser, findUsers, createUser, hashed, compare, updateUser, deleteUser, findId } from '../service/auth.service'
import jwt from 'jsonwebtoken'

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const { email, password }: IUser = req.body
    console.log(`Email: ${email}, Password: ${password}`)

    
    const errors: any = validationResult(req)
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    
    const hPassword = await hashed(password)
    console.log(hPassword)
    
    
    const user = await findUser(email)
    console.log(user?.email)

    if(!user) {
        await createUser(email, hPassword)
    } else {
        return await res.status(400).json({
            msg: "User exist"
        })
    }


    const token = jwt.sign({
        email
    }, "userbfbjklgjeo;fk;kf;k;dkf;", {
        expiresIn: 3600000
    })

    return res.json({token})

  
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    const user = await findUser(email)

    if(!user) {
        
        return res.status(400).json({msg: 'Invalid Credentials'})
    } else {
        const isMatch = await compare(email, password)
        console.log(isMatch)

        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }
        
        const token = jwt.sign({
            email
        }, "userbfbjklgjeo;fk;kf;k;dkf;", {
            expiresIn: 3600000
        })
    
        return res.json({token})
    }
}

export const user = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId

    return await findId(userId).then((user) => res.status(200).json({user}))
}

export const users = async (req: Request, res: Response, next: NextFunction) => {

    return await findUsers().then((user) => res.status(200).json({user}))
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.params.userId
    const { newEmail, newPassword } = req.body
    
    return await updateUser(userId, newEmail, newPassword).then((user) => res.status(200).json({user}))
}

export const deleteU = async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.params.userId

    return await deleteUser(userId).then((user) => res.status(201).json({ message: 'Already delete'}))
}

