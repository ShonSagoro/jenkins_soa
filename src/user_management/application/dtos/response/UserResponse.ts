import { User } from "../../../domain/entities/User";

export class UserResponse {
    public uuid: string;
    public name: string;
    public email: string;
    public lastname: string;
    public phoneNumber: string;

    constructor(user: User) {
        this.uuid = user.uuid;
        this.name = user.contact.name;
        this.email = user.credentials.email;
        this.lastname = user.contact.lastname;
        this.phoneNumber = user.contact.phoneNumber;
    }
}