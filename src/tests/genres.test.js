const request = require('supertest');
const app = require('../app');


let id;

test('GET /generos  debe traer todos los genero', async () =>{
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /generos debe crear un genero', async () => {
    const body = {
        name: "Accion",
       
    }
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});
test('PUT /generos/:id debe actualizar un genero', async () => {
    const body = {
        name: "Accion actualizado"
    }
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});
test('DELET /generos/:id debe eliminar un genero', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});