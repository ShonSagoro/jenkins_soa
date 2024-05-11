import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';
import { SingUpUserUseCase } from '../../application/use_cases/SingUpUserUseCase';
import { SingUpUserRequest } from '../../application/dtos/request/SingUpUserRequest';

export class SingUpUserController{
    constructor(readonly useCase: SingUpUserUseCase) {}

    async execute(req: Request, res: Response) {
        let data = req.body;
        req.body.phoneNumber = parseInt(req.body.phoneNumber);
        try {
            let singUpUserRequest = new SingUpUserRequest(data);
            const baseResponse = await this.useCase.execute(singUpUserRequest);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}