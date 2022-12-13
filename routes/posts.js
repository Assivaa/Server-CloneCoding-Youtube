import express from 'express'
import { createPostController, deletePostController, getAllPost, getBySearch, getPostController, getSubPost, updatePostController } from '../controllers/post.js';
import { authMiddleware } from '../authMiddleware.js';

const router = express.Router()

// Get all post
router.get('/all', getAllPost)

// // Get subscribed post
router.get('/subscribed', authMiddleware, getSubPost)

// Get post
router.get('/find/:postId', authMiddleware, getPostController)

// Create new post
router.post('/', authMiddleware, createPostController)

// Increase post view
router.put('/view/:postId', authMiddleware, createPostController)

// Update post
router.get('/:postId', authMiddleware, updatePostController)

// Delete post
router.get('/:postId', authMiddleware, deletePostController)







// Get by search
// router.get('/', getBySearch)

export default router;