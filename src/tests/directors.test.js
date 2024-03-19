const request = require('supertest');
const app = require('../app');


let id;

test('GET /Directores  debe traer todos los directore', async () =>{
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /Directores debe crear un directore', async () => {
    const body = {
        firstName: "Lucas",
        lastName: "Peralta",
        nationality: "Colombia",
        image: "http://cualquierimagen.com",
        birthday: "2024-03-18"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});
test('PUT /Directores/:id debe actualizar un directore', async () => {
    const body = {
        firstName: "Lucas actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});
test('DELETE /Directores/:id debe eliminar un directore', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});