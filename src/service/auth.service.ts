import express, { Request, Response, NextFunction } from 'express'
import mongoose from "mongoose";
import User from '../model/user.model'
import bcrypt from 'bcrypt'

export const findUser = async (email: string) => {
    
    return await User.findOne({email})
}

export const findId = async (id: string) => {
    
    return await User.findById(id)
}

export const findUsers = async () => {
    
    return await User.find()
}

export const createUser = async (email: string, password: string) => {
    const user = new User({
        id: new mongoose.Types.ObjectId(),
        email: email,
        password: password
    })

    return await user.save()
}

export const updateUser = async (id: string, newEmail: string, newPassword: string) => {
    
    const user = await User.findByIdAndUpdate(id, {email: newEmail, password: newPassword}, {new: true})

    return await user?.save()
}

export const deleteUser = async (id: string) => {
    
    return await User.findByIdAndDelete(id)
}

export const hashed = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    return hashedPassword
}

export const compare = async (email: string, password: string) => {
    const user = await User.findOne({email})

    return bcrypt.compare(password, user?.password as string)
}