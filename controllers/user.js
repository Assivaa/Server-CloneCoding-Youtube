import { createError } from "../error.js"
import User from "../models/User.js"
import Post from "../models/Post.js"

export const getUserController = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const getAllUserController = async (req, res, next) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUserController = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
      },
        { new: true })
      res.status(200).json(updateUser)
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "This is not your user account!"))
  }
}

export const deleteUserController = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.userId,)
      res.status(200).json("User account has been deleted!")
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "This is not your user account!"))
  }
}

export const subscribeUserController = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.userId },
    });
    await User.findByIdAndUpdate(req.params.userId, {
      $inc: { subscriber: 1 },
    });
    res.status(200).json("Subscription is successfull!")
  } catch (error) {
    next(error);
  }
}

export const unsubscribeUserController = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.params.userId },
    });
    await User.findByIdAndUpdate(req.params.userId, {
      $inc: { subscriber: -1 },
    });
    res.status(200).json("Unsubscription is successfull!")
  } catch (error) {
    next(error);
  }
}

export const likePost = async (req, res, next) => {
  const userId = req.user.id
  const postId = req.params.postId
  try {
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId }
    })
    res.status(200).json("The video has been liked!")

  } catch (error) {
    next(error)
  }
}

export const dislikePost = async (req, res, next) => {
  const userId = req.user.id
  const postId = req.params.postId
  try {
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId }
    })
    res.status(200).json("The video has been disliked!")

  } catch (error) {
    next(error)
  }
}