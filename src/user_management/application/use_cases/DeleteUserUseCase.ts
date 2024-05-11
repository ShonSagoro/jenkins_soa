import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserResponse } from "../dtos/response/UserResponse";

export class DeleteUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<BaseResponse> {
        let result= await this.userInterface.delete(uuid);
        if(result){
            return new BaseResponse(null, "User deleted", true, 200)
        }else{
            return new BaseResponse(null, "User not found", false, 404)
        }
    }
}