import { Express } from "express";
import dotenv from 'dotenv';
import { deleteUserController, listUsersController, singInUserController, singUpUserController } from "../Dependencies";
dotenv.config();

const MODEL_URL = "users/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupUserEndpoints(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}sing_up`, singUpUserController.execute.bind(singUpUserController));
    app.post(`${BASE_URL}${MODEL_URL}sing_in`, singInUserController.execute.bind(singInUserController));
    app.get(`${BASE_URL}${MODEL_URL}`, listUsersController.execute.bind(listUsersController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, deleteUserController.execute.bind(deleteUserController));
}