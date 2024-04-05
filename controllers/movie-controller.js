require("dotenv").config()
const { movie } = require("../models/movie-model")
const { findMovieById, createMovie } = require("../services/movies-data")
//const validateMovie = require("../middlewares/validate-movie")
//const validateMovieUpdate = require("../middlewares/validate-movie-update")

exports.createMovie = [
  /* validateMovie,   ******************************/
  async (req, res, next) => {
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body.movieName) {
      return res.status(400).json({ message: "Content can not be empty!" })
    }
    const movie = new movie({
      title: req.body.Title,
      year: req.body.year,
      runtime: req.body.runtime,
      director: req.body.director,
      comicWorld: req.body.comicWorld,
      superHeroMain: req.body.publisher,
      superVillain: req.body.superVillain,
      superHeroSupport: req.body.superHeroSupport,
    })
    try {
      const data = await createMovie(movie)
      res.json(data);
    } catch (err) {
      next(err)
    }
  },
]

exports.getAllMovies = [
  async (req, res, next) => {
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await movie.find()
      res.json(data);
    } catch (err) {
      next(err)
    }
  },
]

exports.getMovieById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Movie ID' }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[404] = { description: 'Not found: Movie with id' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;
    try {
      const data = await findMovieById(id)
      if (!data) {
        return res
          .status(404)
          .json({ message: "Not found Movie with id " + id })
      }
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
]

exports.updateMovieById = [
  /* validateMovieUpdate,   ******************************/
  // #swagger.parameters['id'] = { description: 'Movie ID' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Movie'
          }
        }
      }
    } */
  /* #swagger.responses[200] = {
      description: 'Success: Movie was updated successfully.',
      schema: { $ref: '#/components/schemas/Movie' }
    } */
  // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
  // #swagger.responses[404] = { description: 'Not found: Cannot update Movie with id. Maybe Movie was not found!' }
  // #swagger.responses[500] = { description: 'Internal server error' }
 async (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" })
    }
    const id = req.params.id
    try {
      const data = await movie.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      })

      if (!data) {
        return res.status(404).json({
          message: `Cannot update. Movie id= ${id} not found.`,
        });
      } else {
        res
          .status(200)
          .json({ message: "Movie updated successfully.", movie: data })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.deleteMovieById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Movie ID' }
    // #swagger.responses[204] = { description: 'Success: Movie was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete Movie with id. Movie not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id
    try {
      const data = await Comic.findByIdAndRemove(id)
      if (!data) {
        return res.status(404).json({
          message: `Cannot delete! Movie id= ${id} not found.`,
        })
      } else {
        res.status(204).json({ message: "Movie deleted successfully!" })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.deleteAllMovies = [
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Movies were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await movie.deleteMany({})
      res.status(204).json({
        message: `${data.deletedCount} Comics were deleted successfully!`,
      })
    } catch (err) {
      next(err)
    }
  },
]

exports.toggleMovieActiveStatus = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Movie ID' }
    /* #swagger.responses[200] = {
      description: 'Success: Movie active status was toggled successfully.',
      schema: { $ref: '#/components/schemas/Movie' }
    } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot toggle Movie active status with id. Movie not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" 
      })
    }
    const id = req.params.id
    try {
      const movie = await movie.findById(id)
      if (!movie) {
        return res.status(404).json({
          message: `Cannot toggle Movie active status with id=${id}. Movie not found!`,
        })
      } else {
        movie.isActive = !movie.isActive
        const data = await movie.save()
        res.status(200).json({
          message: `Movie active status was toggled successfully. Current status is ${movie.isActive ? "active" : "inactive"}.`,
          movie: data,
        })
      }
    } catch (err) {
      next(err)
    }
  }
]