const router = require('express').Router();
const { createMovieValidation, deleteMovieValidator } = require('../middlewares/validations');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
