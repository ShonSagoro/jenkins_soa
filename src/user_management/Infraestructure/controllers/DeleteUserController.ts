import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';
import { DeleteUserUseCase } from '../../application/use_cases/DeleteUserUseCase';

export class DeleteUserController{
    constructor(readonly useCase: DeleteUserUseCase) {}

    async execute(req: Request, res: Response) {
        let uuid = req.params.uuid;
        try {
            const baseResponse = await this.useCase.execute(uuid);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}