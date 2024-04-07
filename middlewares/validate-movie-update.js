// middlewares/validateUserUpdate.js
const Joi = require("joi")
const { movieJoiSchema } = require("../models/movie-model")

const movieUpdateJoiSchema = Joi.object({
  movieName: movieJoiSchema.extract("movieName").optional(),
})

const validateMovieUpdate = (req, res, next) => {
  const { error } = movieUpdateJoiSchema.validate(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.statusCode = 400
    return next(err)
  }
  next()
}

module.exports = validateMovieUpdate
