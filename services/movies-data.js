const { movieModel } = require('../models/movie-model')

function findMovieById(id) {
  //console.log('findMovieById', id)
  return movie.findById(id)
}

async function findMovieByName(movieName) {
  //console.log('findMovieById', id)
  return movieModel.findOne({ movieName: movieName })
}

async function createMovie(movieData) {
  const movie = new movie(movieData)
  return await movie.save()
}

async function findOrAddMovie(movieData) {
  const movie = await movieModel.findOrAddMovie(
    { movieName: movieData.movieName },
      {
        title: movieData.movieName,
        year: movieData.year,
        runtime: movieData.runtime,
        director: movieData.director,
        comicWorld: movieData.comicWorld,
        superHeroMain: movieData.superHeroMain,
        superVillain: movieData.superVillain,
        superHeroSupport: movieData.superHeroSupport,
        role: "Editor",
      }
  )
  return movie
}

module.exports = {
  findMovieById,
  findMovieByName,
  createMovie,
  findOrAddMovie
}
