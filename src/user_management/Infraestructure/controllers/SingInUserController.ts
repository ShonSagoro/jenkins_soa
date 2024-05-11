import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';
import { SingInUserRequest } from '../../application/dtos/request/SingInUserRequest';
import { SingInUserUseCase } from '../../application/use_cases/SingInUserUseCase';

export class SingInUserController{
    constructor(readonly useCase: SingInUserUseCase) {}

    async execute(req: Request, res: Response) {
        let data = req.body;
        try {
            let singInUserRequest = new SingInUserRequest(data);
            const baseResponse = await this.useCase.execute(singInUserRequest);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}