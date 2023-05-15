import createError from "http-errors";

export const validateArticleBody = (req, res, next) => {
    const {title, subtitle, description, owner, category} = req.body
    if(!title || !description || !owner || !category){
        next(createError(400, 'Invalid article body'))
    }
    next()
}

export const validateArticleIdParam = (req, res, next) => {
    const {id} = req.params
    if(!id || id.length < 24){
        next(createError(400, 'Article Id is invalid'))
    }
    next()
}

export const validateArticleLikeParam = (req, res, next) => {
    const {id, userId} = req.params
    if(!id || !userId){
        next(createError(400, 'Article Id or User Id is invalid'))
    }
    next()
}
