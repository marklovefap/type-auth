import mongoose from "mongoose";
import { IUser } from "../types";

export interface IUserModel extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}
})

export default mongoose.model<IUserModel>('User', userSchema)