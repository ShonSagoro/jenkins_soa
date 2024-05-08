import { UserInterface } from "../../domain/ports/UserInterface";
import { SingInUserRequest } from "../dtos/request/SingInUserRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserResponse } from "../dtos/response/UserResponse";
export class SingInUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(singInUserRequest:SingInUserRequest): Promise<BaseResponse | null> {
        let result= await this.userInterface.sing_in(singInUserRequest.email, singInUserRequest.password);
        if(result){
            let response = new UserResponse(result)
            return new BaseResponse(response, "User found", true, 200)
        }else{
            return new BaseResponse(null, "User not found", false, 404)
        }
    }
} 