import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';
import { ListUsersUseCase } from "../../application/use_cases/ListUsersUseCase";

export class ListUsersController{
    constructor(readonly useCase: ListUsersUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const baseResponse = await this.useCase.execute();
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}