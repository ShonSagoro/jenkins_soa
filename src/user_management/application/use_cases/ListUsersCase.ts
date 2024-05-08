import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserResponse } from "../dtos/response/UserResponse";

export class ListUsersCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(): Promise<BaseResponse| null> {
        let result= await this.userInterface.list();
        if(result){
            let responses = result.map((user)=>{ new UserResponse(user)})
            return new BaseResponse(responses, "Users found", true, 200)
        }else{
            return new BaseResponse(null, "Users not found", false, 404)
        }
    }
}