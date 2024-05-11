import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";
import bcrypt from 'bcrypt';
import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import { Status } from "../../domain/entities/Status";
import { Contact } from "../../domain/entities/Contact";
import { Credentials } from "../../domain/entities/Credentials";

export class MongoDBUserRepository implements UserInterface {
    private collection!: Collection|any;
    constructor() {
        this.initializeCollection();
    }
    delete(uuid: string): Promise<boolean> {
        try {
            this.collection.deleteOne({ uuid: uuid });
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("user");
    }

    
    async sing_in(email: string, password: string): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ 'credentials.email': email });
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastname, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, result.credentials.password);
                const user = new User(status, contact, credentials);
                user.uuid=result.uuid;
                if (await bcrypt.compare(password, user.credentials.password)) {
                    user.status.token = "token"; 
                    user.status.verifiedAt = new Date();
                    await this.collection.updateOne({ uuid: user.uuid }, { $set: user });
                    return user;
                }else{
                    return null;
                }
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

 

    async sing_up(user: User): Promise<User | null> {
        let user_origin=user;
        user_origin.credentials.password = await bcrypt.hash(user.credentials.password, 10);
        try {
            const result = await this.collection.findOne({ 'credentials.email': user.credentials.email });
            if (result) {
                return null;
            }else{
                const { _id, ...userWithoutId } = user as any;
                await this.collection.insertOne(userWithoutId);
                return user_origin;
            }
        } catch (error) {
            console.error(error); 
            return null;
        }
    }
    async list(): Promise<User[] | null> {
        try {
            const result = await this.collection.find().toArray();

            return result.map((user: { token: string; verifiedAt: Date; contact: { name: string; lastname: string; phoneNumber: string; }; credentials: { email: string; password: string; }; uuid: string; }) => {
                let status = new Status(user.token, user.verifiedAt);
                let contact = new Contact(user.contact.name, user.contact.lastname, user.contact.phoneNumber);
                let credentials = new Credentials(user.credentials.email, "");
                
                let newUser = new User(status, contact, credentials);
                newUser.uuid = user.uuid;
                
                return newUser;
            });
        } catch (error) {
            return null;
        }
    }
}