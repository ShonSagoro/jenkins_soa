import { User } from "../entities/User";

export interface UserInterface {
    list(): Promise<User[]|null>;
    sing_up(user: User): Promise<User | null>;
    sing_in (email:string, password:string):Promise<User|null>;
}
