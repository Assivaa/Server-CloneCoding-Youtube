import express from 'express'
import { authMiddleware } from '../authMiddleware.js';
import { createCommentController, deleteCommentController, getCommentController } from '../controllers/comment.js';

const router = express.Router()

router.get('/:postId', authMiddleware, getCommentController)

router.post('/', authMiddleware, createCommentController)

router.delete('/:commentId', authMiddleware, deleteCommentController)

export default router;