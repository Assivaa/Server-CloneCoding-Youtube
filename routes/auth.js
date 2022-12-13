import express from 'express'
import { signin, signup } from '../controllers/auth.js';

const router = express.Router()

// Create user account
router.post("/signup", signup)

// Sign in
router.post("/signin", signin)

// Google Auth
router.post("/google")

export default router;