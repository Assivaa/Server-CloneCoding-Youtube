import { createError } from "../error.js"
import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

export const getCommentController = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}

export const createCommentController = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id })
  try {
    const savedComment = await newComment.save()
    res.status(200).send(savedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteCommentController = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.commentId)
    const post = await Post.findById(res.params.commentId)

    if (req.user.id === comment.userId || req.user.id === post.userId) {
      await Comment.findByIdAndDelete(res.params.commentId)
      res.status(200).json("The comment has been deleted!")
    } else { }
    return next(createError(403, "The comment is not able to be deleted!"))
  } catch (error) {
    next(error)
  }
}