import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}, { timestamps: true })

export default mongoose.model('Comment', CommentSchema)