import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUserById,
  deleteUserById,
  getUserByIdWithArticles,
} from '../controllers/user.controller.js';
import {
  validateAgeQuery,
  validateUserBody,
  validateUserBodyUpdate,
  validateUserIdParam
} from '../middlewares/users.middleware.js'

const userRouter = Router();

userRouter
  .get('/', validateAgeQuery,  getUsers)
  .get('/:id', validateUserIdParam, getUserByIdWithArticles)
  .post('/', validateUserBody, createUser)
  .put('/:id', validateUserIdParam,validateUserBodyUpdate, updateUserById)
  .delete('/:id', validateUserIdParam, deleteUserById);

export default userRouter;
