const { MovieModel } = require("../models/movie-model");

function findMovieById(id) {
  //console.log('findMovieById', id)
  return MovieModel.findById(id);
}

async function findMovieByName(movieName) {
  //console.log('findMovieById', id)
  return MovieModel.findOne({ movieName: movieName });
}

async function createMovieService(movieData) {
  const movie = new MovieModel(movieData);
  return await movie.save();
}

async function findOrAddMovie(movieData) {
  const movie = await MovieModel.findOrAddMovie(
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
  );
  return movie;
}

module.exports = {
  findMovieById,
  findMovieByName,
  createMovieService,
  findOrAddMovie,
};
