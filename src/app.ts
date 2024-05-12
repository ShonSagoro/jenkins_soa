import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { setupUserEndpoints } from './user_management/Infraestructure/endpoints/UserEndpoints';

dotenv.config();

const app = express();


const HOST:string = process.env.HOST_SERVER || '0.0.0.0';
const PORT:number  = Number(process.env.PORT_SERVER) || 8080;

app.use(express.static(path.join(__dirname, './public/images')));
app.use(express.json()); 
setupUserEndpoints(app);
app.use(morgan('dev'))

let server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on host ${HOST} and port ${PORT}`);
    console. log("soy un cambio")
});


export { app, server };

function cors(): any {
    throw new Error('Function not implemented.');
}
