import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import { IUser } from '../types'
import jwt from 'jsonwebtoken'
import { compare, createAdmin, findAdmin, hashed } from '../service/admin.service'

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
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
    
    
    const user = await findAdmin(email)
    console.log(user?.email)

    if(!user) {
        await createAdmin(email, hPassword)
    } else {
        return await res.status(400).json({
            msg: "Admin exist"
        })
    }


    const token = jwt.sign({
        email
    }, "adminbfbjklgjeo;fk;kf;k;dkf;", {
        expiresIn: 3600000
    })

    return res.json({token})

  
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    const user = await findAdmin(email)

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
        }, "adminbfbjklgjeo;fk;kf;k;dkf;", {
            expiresIn: 3600000
        })
    
        return res.json({token})
    }
}
