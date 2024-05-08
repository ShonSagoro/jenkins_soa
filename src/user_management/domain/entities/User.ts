import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from '../validations/ValidatableEntity';
import { Status } from './Status';
import { Contact } from './Contact';
import { Credentials } from './Credentials';



export class User implements ValidatableEntity {

    public uuid: string;
    
    public status: Status;

    public contact: Contact;

    public credentials: Credentials;


    constructor(status: Status, contact: Contact, credentials: Credentials) {
        this.uuid = uuidv4();
        this.contact=contact
        this.status=status
        this.credentials=credentials
    }

    async validate() {
        return Promise.resolve();
    }
}