import { createError } from "../error.js"
import Post from "../models/Post.js"
import User from "../models/User.js";

export const createPostController = async (req, res, next) => {
  const newPost = new Post({ userId: req.user.id, ...req.body })
  try {
    const savePost = await newPost.save()
    res.status(200).json(savePost)
  } catch (error) {
    next(error)
  }
}

export const getPostController = async (req, res, next) => {
  try {
    const id = req.params.postId
    const post = await Post.findById(id)
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const updatePostController = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return next(createError(404, "Video not found!"))
    }

    if (req.user.id === post.postId) {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.postId, {
        $set: req.body
      }, { new: true }
      )
      res.status(200).json(updatePost)
    } else {
      return next(createError(404, "Video is not able to be edited!"))
    }
  } catch (error) {
    next(error)
  }
}

export const deletePostController = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return next(createError(404, "Video not found!"))
    }

    if (req.user.id === post.postId) {
      const updatePost = await Post.findByIdAndDelete(
        req.params.postId
      )
      res.status(200).json("Video has been deleted")
    } else {
      return next(createError(404, "Video is not able to be deleted!"))
    }
  } catch (error) {
    next(error)
  }
}

export const increaseView = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $inc: { views: 1 },
    })
    res.status(200).json("The view has been increased!")
  } catch (error) {
    next(error)
  }
}

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getSubPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedUsers = user.subscribedUser;


    const postList = await Promise.all(
      subscribedUsers.map(async (channelId) => {
        return await Post.find({ userId: channelId });
      })
    );

    res.status(200).json(postList.flat().sort((a, b) => b.createdAt - a.createdAt))
  } catch (error) {
    next(error)
  }
}

export const getBySearch = async (req, res, next) => {
  const query = req.query.q;
  try {
    const postsWithQuery = await Post.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(postsWithQuery);
  } catch (error) {
    next(error);
  }
}
