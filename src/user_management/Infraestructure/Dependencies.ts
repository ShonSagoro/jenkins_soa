import { DeleteUserUseCase } from './../application/use_cases/DeleteUserUseCase';
import { SingUpUserUseCase } from './../application/use_cases/SingUpUserUseCase';
import { SingInUserUseCase } from './../application/use_cases/SingInUserUseCase';
import { ListUsersUseCase } from './../application/use_cases/ListUsersUseCase';
import { MongoDBUserRepository } from './repositories/MongoDBUserRepository';
import { DeleteUserController } from './controllers/DeleteUserController';
import { SingUpUserController } from './controllers/SingUpUserController';
import { SingInUserController } from './controllers/SingInUserController';
import { ListUsersController } from './controllers/ListUsersController';


export const database = new MongoDBUserRepository();

export const listUsersUseCase = new ListUsersUseCase(database);
export const singInUserUseCase = new SingInUserUseCase(database);
export const singUpUserUseCase = new SingUpUserUseCase(database);
export const deleteUserUseCase = new DeleteUserUseCase(database);

export const listUsersController = new ListUsersController(listUsersUseCase);
export const singInUserController = new SingInUserController(singInUserUseCase);
export const singUpUserController = new SingUpUserController(singUpUserUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
