// middlewares/validateSuperhero.js
const { superheroJoiSchema } = require('../models/superhero-model')

const validateSuperhero = (req, res, next) => {
  console.log('body', req.body)
  const { error } = superheroJoiSchema.validate(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.statusCode = 400
    return next(err)
  }
  next()
}

module.exports = validateSuperhero
