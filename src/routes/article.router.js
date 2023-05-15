import { Router } from 'express';
import {
  createArticle,
  updateArticleById,
  deleteArticleById, getArticlesByTitle, createLike, deleteLike,
} from '../controllers/article.controller.js';
import {
  validateArticleBody,
  validateArticleIdParam,
  validateArticleLikeParam
} from "../middlewares/articles.middleware.js";

const articleRouter = Router();

articleRouter
    .get('/', getArticlesByTitle)
  .post('/', validateArticleBody, createArticle)
  .put('/:id', validateArticleIdParam, validateArticleBody, updateArticleById)
  .delete('/:id', validateArticleIdParam, deleteArticleById)
    .post('/like/:id/:userId', validateArticleLikeParam, createLike)
    .delete('/like/:id/:userId', validateArticleLikeParam, deleteLike)

export default articleRouter;
