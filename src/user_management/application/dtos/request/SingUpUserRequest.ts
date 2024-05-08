import { Contact } from "../../../domain/entities/Contact";
import { Credentials } from "../../../domain/entities/Credentials";
import { Status } from "../../../domain/entities/Status";

export class SingUpUserRequest {

    
    public status: Status;

    public contact: Contact;

    public credentials: Credentials;


    constructor(request: any) {
        this.contact= new Contact(request.name, request.lastname, request.phoneNumber)
        this.status=new Status("", new Date())
        this.credentials= new Credentials(request.email, request.password)
    }
}