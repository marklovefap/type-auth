import mongoose from "mongoose";
import express, { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export const checkAdmin = async(req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-auth-token')

    if(!token) {
        return res.status(400).json({msg: 'No token found'})
    }

    try {
        let user = await jwt.verify(token, 'adminbfbjklgjeo;fk;kf;k;dkf;')
        //@ts-ignore
        req.user = user.email
        next()
    } catch (error) {
        return res.status(400).json({msg: 'Token invalid'})
    }

}