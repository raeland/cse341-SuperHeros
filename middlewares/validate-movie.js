// middlewares/validateUser.js
const { movieJoiSchema } = require("../models/movie-model")

const validateMovie = (req, res, next) => {
  // console.log('body', req.body)
  const { error } = movieJoiSchema.validate(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.statusCode = 400
    return next(err)
  }
  next()
}

module.exports = validateMovie
