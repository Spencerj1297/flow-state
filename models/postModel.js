import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    msg: {
        type: String,
        required: true
    }
}, {timestamps: true})

const PostModal = model.post || model('post', postSchema)

export default PostModal