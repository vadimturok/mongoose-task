import createError from 'http-errors'

export const validateAgeQuery = (req, res, next) => {
    const {age} = req.query
    if(!age || Number(age) !== 1 && Number(age) !== -1){
        next(createError(400, 'Age param is invalid'))
    }
    next()
}

export const validateUserIdParam = (req, res, next) => {
    const {id} = req.params
    if(!id || id.length < 24){
        next(createError(400, 'User Id is invalid'))
    }
    next()
}

export const validateUserBody = (req, res, next) => {
    const {firstName, lastName, email, role, age} = req.body
    if(!firstName || !lastName || !email || !role || !age){
        next(createError(400, 'Invalid user body'))
    }
    next()
}

export const validateUserBodyUpdate = (req, res, next) => {
    const {firstName, lastName, age} = req.body
    if(!firstName || !lastName || !age){
        next(createError(400, 'Invalid user body'))
    }
    next()
}