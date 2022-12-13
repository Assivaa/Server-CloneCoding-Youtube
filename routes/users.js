import express from 'express'
import { deleteUserController, dislikePost, getAllUserController, getUserController, likePost, subscribeUserController, unsubscribeUserController, updateUserController } from '../controllers/user.js';
import { authMiddleware } from '../authMiddleware.js';

const router = express.Router()

// Get user account
router.get('/find/:userId', getUserController)

// Get user account
router.get('/all', getAllUserController)

// Update user account
router.put('/:userId', authMiddleware, updateUserController)

// Delete user account
router.delete('/:userId', authMiddleware, deleteUserController)

// Subscribe user account
router.put('/subscribe/:userId', authMiddleware, subscribeUserController)

// Unsubsribe user account
router.put('/unsubscribe/:userId', authMiddleware, unsubscribeUserController)

// Like post
router.put('/like/:postId', authMiddleware, likePost)

// Disike post
router.put('/dislike/:postId', authMiddleware, dislikePost)

export default router;