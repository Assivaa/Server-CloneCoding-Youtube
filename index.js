import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

const connect = () => {
  mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to database!')
  }).catch(err => {
    throw err
  })
}

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", postRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Something went wrong!"
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(8080, () => {
  connect()
  console.log("connected to server!")
})
