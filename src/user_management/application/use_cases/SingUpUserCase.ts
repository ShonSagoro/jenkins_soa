import { Contact } from "../../domain/entities/Contact";
import { Status } from "../../domain/entities/Status";
import { User } from "../../domain/entities/User";
import { Credentials } from "../../domain/entities/Credentials";
import { UserInterface } from "../../domain/ports/UserInterface";
import { SingUpUserRequest } from "../dtos/request/SingUpUserRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserResponse } from "../dtos/response/UserResponse";

export class SingUpUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(singUpUserRequest:SingUpUserRequest): Promise<BaseResponse | null> {
        let contact = new Contact(singUpUserRequest.contact.name, singUpUserRequest.contact.lastname, singUpUserRequest.contact.phoneNumber)
        let credentials= new Credentials(singUpUserRequest.credentials.email, singUpUserRequest.credentials.password)
        let status = new Status("", new Date())

        let user = new User(
            status,
            contact,
            credentials
        )
        let result = await this.userInterface.sing_up(user);
        if(result){
            let response = new UserResponse(result);
            return new BaseResponse(response, "User created", true, 201);
        }else{
            return new BaseResponse(null, "User not created", false, 404);
        }
    }
}