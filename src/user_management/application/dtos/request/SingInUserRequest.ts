export class SingInUserRequest {
    public email: string;
    public password: string;


    constructor(request: any) {
        this.email = request.email;
        this.password = request.password;
    }
}