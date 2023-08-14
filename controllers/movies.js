const Movie = require('../models/movie');
const ValidationError = require('../middlewares/errors/ValidationError');
const ForbiddenError = require('../middlewares/errors/ForbiddenError');

const { CREATED_CODE } = require('../constants/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    let movies = await Movie.find({});
    const { _id } = req.user;
    movies = movies.filter((movie) => movie.owner.toString() === _id);
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: _id,
    });
    res.status(CREATED_CODE).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError());
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { _id } = req.user;
    let movie = await Movie.findMovieById(req.params.movieId, next);
    if (movie.owner.toString() !== _id) {
      throw new ForbiddenError();
    }
    movie = await Movie.findByIdAndRemove(req.params.movieId);
    res.send(movie);
  } catch (err) {
    next(err);
  }
};
