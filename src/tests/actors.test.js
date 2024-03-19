const request = require('supertest');
const app = require('../app');


let id;

test('GET /actores  debe traer todos los actores', async () =>{
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actores debe crear un actor', async () => {
    const body = {
        firstName: "Carlos",
        lastName: "Perez",
        nationality: "Haiti",
        image: "http://cualquierimagen.com",
        birthday: "2024-03-18"
    }
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});
test('PUT /actores/:id debe actualizar un actor', async () => {
    const body = {
        firstName: "Carlos actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});
test('DELETE /actores/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});