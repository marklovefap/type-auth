import mongoose from "mongoose";
import { IUser } from "../types";

export interface IAdminModel extends IUser, mongoose.Document {}

const adminSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}
})

export default mongoose.model<IAdminModel>('Admin', adminSchema)