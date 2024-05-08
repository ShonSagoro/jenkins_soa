import request from 'supertest';
import { app, server } from '../src/app';

jest.setTimeout(30000);

let url_base_inicio_sesion = '/api/v1/users/sing_in'
let url_base_register = '/api/v1/users/sing_up'

afterAll(async () => {
    server.close();
});

describe('Iniciar sesión', () => {
    let userUUID: string;

    beforeAll(async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'test@gmail.com',
                password: '12345678'
            });
        console.log(response.body.message);
        expect(response.status).toBe(200);
        userUUID = response.body.data.uuid;
    });

    it('no debería permitir un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: '', password: '12345678' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'invalid', password: '12345678' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'nonexistent@example.com', password: 'password' });
        expect(response.status).toBe(404);
    });

    it('no debería permitir una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: 'incorrect' });
        expect(response.status).toBe(404);
    });

    it('debería devolver un token si el acceso es correcto', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('user_token');
    });

    afterAll(async () => {
        let response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        const token = response.body.data.jwt_token;
        response = await request(app)
            .delete(`/api/v1/users/${userUUID}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});



