import mongoose from "mongoose";
import { IPost } from "../types";

export interface IPostModel extends IPost, mongoose.Document {}

const publicSchema = new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true}
})

export default mongoose.model<IPostModel>('Public', publicSchema)

