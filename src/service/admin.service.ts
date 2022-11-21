import express, { Request, Response, NextFunction } from 'express'
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import Admin from '../model/admin.model'

export const findAdmin = async (email: string) => {
    
    return await Admin.findOne({email})
}

export const findAdmins = async () => {
    
    return await Admin.find()
}

export const createAdmin = async (email: string, password: string) => {
    const admin = new Admin({
        id: new mongoose.Types.ObjectId(),
        email: email,
        password: password
    })

    return await admin.save()
}

export const updateAdmin = async (email: string, newEmail: string, newPassword: string) => {
    
    const admin = await Admin.findOneAndUpdate({email}, { email: newEmail, password: newPassword }, {new: true})

    return await admin?.save()
}

export const deleteAdmin = async (email: string) => {
    const admin = await Admin.findOneAndDelete({email})

    return await admin?.save()
}

export const hashed = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    return hashedPassword
}

export const compare = async (email: string, password: string) => {
    const admin = await Admin.findOne({email})

    return bcrypt.compare(password, admin?.password as string)
}