import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from "../error.js";

// Create user account
export const signup = async (req, res, next) => {
  try {
    // const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })

    await newUser.save()
    res.status(200).json("User account has been created!")
  } catch (error) {
    next(error)
  }
}

// Auth user account
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'User not found!'))

    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) return next(createError(400, 'Incorrect password!'))

    const token = jwt.sign({ id: user._id }, process.env.JWT)
    const { password, ...others } = user._doc

    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json(others)
  } catch (error) {
    next(error)
  }
}