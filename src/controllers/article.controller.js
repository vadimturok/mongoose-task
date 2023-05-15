import Article from '../models/article.model.js';
import createError from "http-errors";
import User from "../models/user.model.js";

export const createArticle = async (req, res, next) => {
  try {
    const {title, subtitle, description, owner, category} = req.body
    const user = await User.findById(owner)
    if(!user){
      res.status(404).json({message: 'User does not exists'})
      return;
    }
    const newArticle = await Article.create({
      title,
      subtitle,
      description,
      owner,
      category
    })
    user.numberOfArticles += 1
    user.articles.push(newArticle._id)
    await user.save()
    res.status(200).json(newArticle)
  } catch (err) {
    next(createError(400, err._message));
  }
}

export const updateArticleById = async (req, res, next) => {
  try {
    const {id} = req.params
    const {title, subtitle, description, owner, category} = req.body
    const article = await Article.findById(id)
    const user = await User.findById(owner)
    if(article && user && article.owner.toString() === owner){
      article.title = title
      article.subtitle = subtitle
      article.description = description
      article.category = category
      await article.save()
      res.json(article)
    }else{
      res.status(400).json({message: "Article or user is invalid"})
    }
  } catch (err) {
    next(createError(400, err._message));
  }
}

export const getArticlesByTitle = async (req, res, next) => {
  try{
    const {title, page = 1, limit = 5} = req.query
    const articles = await Article.find({"title": title})
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('owner', 'fullName email age -_id')

    const count = await Article.count()
    res.json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  }catch(err){
    next(createError(400, err._message))
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findOne({articles: {$in: [id]}})
    if(user){
      const deletedArticle = await Article.findByIdAndDelete(id)
      user.articles = user.articles.filter(article => article.toString() !== deletedArticle._id.toString())
      user.numberOfArticles -= 1
      await user.save()
      res.json(deletedArticle)
    }else{
      res.status(400).json({message: 'Invalid operation'})
    }
  } catch (err) {
    next(createError(400, err._message))
  }
}

export const createLike = async (req, res, next) => {
  try{
    const {id, userId} = req.params
    const user = await User.findById(userId)
    const article = await Article.findById(id)
    if(article && user){
      user.likedArticles.push(article._id)
      article.likes.push(user._id)
      await user.save()
      await article.save()
      res.status(201).json(article)
    }else{
      res.status(404).json({message: 'Article or user does not exists'})
    }
  }catch(err){
    next(createError(400, err._message))
  }
}

export const deleteLike = async (req, res, next) => {
  try{
    const {id, userId} = req.params
    const user = await User.findById(userId)
    const article = await Article.findById(id)
    if(article && user){
      user.likedArticles = user.likedArticles.filter(a => a._id.toString() !== article._id.toString())
      article.likes = article.likes.filter(u => u._id.toString() !== user._id.toString())
      await user.save()
      await article.save()
      res.status(201).json(article)
    }else{
      res.status(404).json({message: 'Article or user does not exists'})
    }
  }catch(err){
    next(createError(400, err._message))
  }
}
