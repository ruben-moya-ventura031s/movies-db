const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');


let id;

test('GET /peliculas  debe traer todos los pelicula', async () =>{
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /peliculas debe crear un pelicula', async () => {
    const body = {
        name: "El ganador",
        image: "http://cualquierimagen.com",
        synopsis: "La mejor pelicula",
        releaseYear: 2023
    }
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});
test('PUT /peliculas/:id debe actualizar un pelicula', async () => {
    const body = {
       name: "El ganador actualizado"
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});
test('POST /peliculas/:id/actores debe insertar los actores de una pelicula', async () => {
    const actors = await Actors.create({ firstName: 'Pedro',
        lastName: "Perez",
        nationality: "Haiti",
        image: "http://cualquierimagen.com",
        birthday: "2024-03-18"
});
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actors.id]);
    await actors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Pedro');
});
test('POST /peliculas/:id/actores con id incorrecto debe retornar 404', async () => {
    const res = await request(app)
        .post(`/movies/-1/actors`)
        .send([]);
    expect(res.status).toBe(404);
});
test('POST /peliculas/:id/directores debe insertar los directores de una pelicula', async () => {
    const directors = await Directors.create({ firstName: 'Luis',
        lastName: "Peralta",
        nationality: "Colombia",
        image: "http://cualquierimagen.com",
        birthday: "2024-03-18"
});
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([directors.id]);
    await directors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Luis');
});
test('POST /peliculas/:id/directores con id incorrecto debe retornar 404', async () => {
    const res = await request(app)
        .post(`/movies/-1/actors`)
        .send([]);
    expect(res.status).toBe(404);
});
test('POST /Peliculas/:id/generos debe insertar los géneros de una pelicula', async () => {
    const genres = await Genres.create({ name: 'Drama' });
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genres.id]);
    await genres.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Drama');
});
test('POST /Peliculas/:id/generos con id incorrecto debe retornar 404', async () => {
    const res = await request(app)
        .post(`/movies/-1/genres`)
        .send([]);
    expect(res.status).toBe(404);
});
test('DELETE /peliculas/:id debe eliminar un pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});