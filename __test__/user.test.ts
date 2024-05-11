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
        expect(response.status).toBe(201);
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

    afterAll(async () => {
        let response = await request(app)
            .delete(`/api/v1/users/${userUUID}`)
        expect(response.status).toBe(200);
    });
});

describe('Registrar usuario', () => {

    let uuidFree: string;
    it('El email no debe estar vacío.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: '',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789'
            })
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
    it('El email debe cumplir con el formato.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'freeatgmail.com', // invalid email format
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('Los datos como numero de telefono debe ir', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '' // empty phone number
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('El nombre no debe estar vacío.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'password2',
                name: '', // empty name
                lastname: 'test3',
                phoneNumber: '923456789'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('La contraseña no debe ser menor a 8 caracteres.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'pass', // less than 8 characters
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('La contraseña es demasiado larga para un objeto string (al maximo 32 caracteres)', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'thisIsAPasswordThatIsLongerThan32Characters',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("Formato correcto, entonces pasa", async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'test11@gmail.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789'
            });
        uuidFree = response.body.data.uuid;
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });

    afterEach(async () => {
        let response = await request(app)
            .delete(`/api/v1/users/${uuidFree}`);
        expect(response.status).toBe(200);
    });
});