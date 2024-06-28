import { Injectable } from "@nestjs/common";
import { CreateUser, CreateUserRequest, CreateUserResponse } from "./create-user";
import { GetUserByEmail, GetUserByEmailRequest, GetUserByEmailResponse } from "./get-user-by-email";

@Injectable()
export class UserService {
    constructor(
        private createUser: CreateUser,
        private getUserByEmail: GetUserByEmail,

    ) {}

    async create(request: CreateUserRequest): Promise<CreateUserResponse> {
        return await this.createUser.execute(request);
    }
    async getByEmail(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
        return await this.getUserByEmail.execute(request);
    }

}