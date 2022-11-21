import mongoose from "mongoose";
import Public from "../model/publicPost.model";
import Private from "../model/privatePost.model";

export const findPublic = async (title: string) => {
    
    return await Public.findOne({title})
}

export const findPublics = async () => {
    
    return await Public.find()
}

export const createPublic = async (title: string, content: string) => {
    const post = new Public({
        id: new mongoose.Types.ObjectId(),
        title: title,
        content: content
    })

    return await post.save()
}

export const updatePublic = async (title: string, newTitle: string, newContent: string) => {
    
    const post = await Public.findOneAndUpdate({title}, { title: newTitle, content: newContent }, {new: true})

    return await post?.save()
}

export const deletePublic = async (title: string) => {
    
    return await Public.findOneAndDelete({title})
}

export const findPrivate = async (title: string) => {
    
    return await Private.findOne({title})
}

export const findPrivates = async () => {
    
    return await Private.find()
}

export const createPrivate = async (title: string, content: string) => {
    const post = new Private({
        id: new mongoose.Types.ObjectId(),
        title: title,
        content: content
    })

    return await post.save()
}

export const updatePrivate = async (title: string, newTitle: string, newContent: string) => {
    
    const post = await Private.findOneAndUpdate({title}, { title: newTitle, content: newContent }, {new: true})

    return await post?.save()
}

export const deletePrivate = async (title: string) => {

    return await Private.findOneAndDelete({title})
}
