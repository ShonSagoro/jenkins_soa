import { UserInterface } from "../../domain/ports/UserInterface";
import { SingInUserRequest } from "../dtos/request/SingInUserRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserResponse } from "../dtos/response/UserResponse";
export class SingInUserUseCase {
    email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    constructor(readonly userInterface: UserInterface) {}

    async execute(singInUserRequest:SingInUserRequest): Promise<BaseResponse> {
        if (!singInUserRequest.email || !singInUserRequest.password) {
            return new BaseResponse(null, "Email and password are required", false, 400)
        }
        if (singInUserRequest.password.length < 8) {
            return new BaseResponse(null, "Password must be at least 8 characters", false, 400)
        }
        if (!this.email_regex.test(singInUserRequest.email)) {
            return new BaseResponse(null, "Invalid email format", false, 400)
        }
        let result= await this.userInterface.sing_in(singInUserRequest.email, singInUserRequest.password);
        if(result){
            let response = new UserResponse(result)
            return new BaseResponse(response, "User found", true, 200)
        }else{
            return new BaseResponse(null, "User not found", false, 404)
        }
    }
} 