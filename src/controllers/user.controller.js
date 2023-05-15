import User from '../models/user.model.js';
import createError from "http-errors";
import Article from "../models/article.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const {age} = req.query
    const users = await User.find({}, {
      "fullName": 1,
      email: 1,
      age: 1
    }).sort({"age": age})
    res.json(users)
  } catch (err) {
    next(createError(400, err._message));
  }
}

export const getUserByIdWithArticles = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findById(id).populate('articles', 'title subtitle createdAt -_id')
    if(!user){
      return next(createError(404, 'User not found'))
    }
    res.json(user)
  } catch (err) {
    next(createError(400, err._message));
  }
}

export const createUser = async (req, res, next) => {
  try {
    const {firstName, lastName, email, role, age} = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      role,
      age
    })
    res.status(200).json(newUser)
  } catch (err) {
    next(createError(400, err._message));
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const {id} = req.params
    const {firstName, lastName, age} = req.body
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      age,
      fullName: `${firstName} ${lastName}`
    }, {
      new: true
    })
    res.json(updatedUser)
  } catch (err) {
    next(createError(400, err._message));
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const {id} = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    if(!deletedUser){
      return next(createError(404, 'User not found'))
    }
    await Article.deleteMany({owner: id})
    res.json(deletedUser)
  } catch (err) {
    next(createError(400, err._message));
  }
}

