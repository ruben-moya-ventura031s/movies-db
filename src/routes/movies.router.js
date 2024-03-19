const { getAll, create, getOne, remove, update, setActorsMovies, setGenresMovies, setDirectorsMovies } = require('../controllers/movies.controllers');
const express = require('express');

const routerMovies = express.Router();

routerMovies.route('/movies')
    .get(getAll)
    .post(create);

routerMovies.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerMovies.route('/movies/:id/genres')
    .post(setGenresMovies);

routerMovies.route('/movies/:id/actors')
    .post(setActorsMovies);

routerMovies.route('/movies/:id/directors')
    .post(setDirectorsMovies);

module.exports = routerMovies;