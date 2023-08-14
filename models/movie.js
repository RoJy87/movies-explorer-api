const mongoose = require('mongoose');
const NotFoundError = require('../middlewares/errors/NotFoundError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

movieSchema.statics.findMovieById = async function findMovie(movieId, next) {
  let movie;
  try {
    movie = await this.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильма нет в базе');
    }
  } catch (err) {
    next(err);
  }
  return movie;
};

module.exports = mongoose.model('movie', movieSchema);
