const { getAll, create, getOne, remove, update, setGenre, setActor, setDirector } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id/genres')
    .post(setGenre)

movieRouter.route('/:id/actors')
    .post(setActor)

movieRouter.route('/:id/directors')
    .post(setDirector)

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = movieRouter;