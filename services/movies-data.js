const { movie } = require('../models/movie-model')

function findMovieById(id) {
  console.log('findMovieById', id)
  return movie.findById(id)
}

async function createMovie(movieData) {
  const movie = new Comic(movieData)
  return await movie.save()
}

module.exports = {
  findMovieById,
  createMovie,
}
