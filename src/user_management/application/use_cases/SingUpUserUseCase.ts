import { Contact } from "../../domain/entities/Contact";
import { Status } from "../../domain/entities/Status";
import { User } from "../../domain/entities/User";
import { Credentials } from "../../domain/entities/Credentials";
import { UserInterface } from "../../domain/ports/UserInterface";
import { SingUpUserRequest } from "../dtos/request/SingUpUserRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserResponse } from "../dtos/response/UserResponse";

export class SingUpUserUseCase {
    email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    constructor(readonly userInterface: UserInterface) { }

    async execute(singUpUserRequest: SingUpUserRequest): Promise<BaseResponse> {
        if (!singUpUserRequest.credentials.email || !singUpUserRequest.credentials.password) {
            return new BaseResponse(null, "Email and password are required", false, 400)
        }
        if (singUpUserRequest.credentials.password.length < 8 || singUpUserRequest.credentials.password.length > 32) {
            return new BaseResponse(null, "Password must be at least 8 characters or maximun 32 characters", false, 400)
        }
        if (!this.email_regex.test(singUpUserRequest.credentials.email)) {
            return new BaseResponse(null, "Invalid email format", false, 400)
        }
        if (!singUpUserRequest.contact.name || !singUpUserRequest.contact.lastname || !singUpUserRequest.contact.phoneNumber) {
            return new BaseResponse(null, "Name, lastname and phone number are required", false, 400)
        }
        if (typeof singUpUserRequest.contact.phoneNumber !== 'number') {
            return new BaseResponse(null, "Phone number must be a number", false, 400)
        }
        let status = new Status("", new Date())
        let user = new User(
            status,
            singUpUserRequest.contact,
            singUpUserRequest.credentials
        )
        let result = await this.userInterface.sing_up(user);
        if (result) {
            let response = new UserResponse(result);
            return new BaseResponse(response, "User created", true, 201);
        } else {
            return new BaseResponse(null, "User not created", false, 404);
        }
    }
}