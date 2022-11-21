import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from 'express'
import { IPost } from "../types";
import { findPrivate, findPrivates, findPublic, findPublics, createPrivate, createPublic, updatePublic, deletePublic, deletePrivate, updatePrivate } from "../service/post.service";

export const privatePost = async (req: Request, res: Response) => {
    const {title}: IPost = req.body

    return await findPrivate(title).then((post) => res.status(200).json({post}))
}

export const privatePosts = async (req: Request, res: Response) => {
   
    return await findPrivates().then((post) => res.status(200).json({post}))
}

export const publicPost = async (req: Request, res: Response) => {
    const {title}: IPost = req.body

    return await findPublic(title).then((post) => res.status(200).json({post}))
}

export const publicPosts = async (req: Request, res: Response) => {
 
    return await findPublics().then((post) => res.status(200).json({post}))
}

export const cPrivate = async (req: Request, res: Response) => {
    const {title, content}: IPost = req.body

    return await createPrivate(title, content).then((post) => res.status(200).json({post}))
}

export const cPublic = async (req: Request, res: Response) => {
    const {title, content}: IPost = req.body

    return await createPublic(title, content).then((post) => res.status(200).json({post}))
}

export const uPublic = async (req: Request, res: Response, next: NextFunction) => {
    
    const { title, newTitle, newContent } = req.body

    return await updatePublic(title, newTitle, newContent).then((post) => res.status(200).json({post}))
}

export const dPublic = async (req: Request, res: Response, next: NextFunction) => {
    
    const { title } = req.body

    return await deletePublic(title).then((post) => res.status(200).json({ message: 'Already delete'}))
}

export const uPrivate = async (req: Request, res: Response, next: NextFunction) => {
    
    const { title, newTitle, newContent } = req.body

    return await updatePrivate(title, newTitle, newContent).then((post) => res.status(200).json({post}))
}

export const dPrivate = async (req: Request, res: Response, next: NextFunction) => {
    
    const { title } = req.body

    return await deletePrivate(title).then((post) => res.status(200).json({ message: 'Already delete'}))
}

