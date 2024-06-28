import { Injectable } from "@nestjs/common";
import { CreateCompany, CreateCompanyRequest, CreateCompanyResponse } from "./create-company";
import { CreateCompanyAndUser, CreateCompanyAndUserRequest, CreateCompanyAndUserResponse } from "./create-company-user";
import { GetCompanyAndUserInfo, getCompanyAndUserInfoRequest, getCompanyAndUserInfoResponse } from "./get-company-user-info";

@Injectable()
export class CompanyService {
    constructor(
        private createCompany: CreateCompany,
        private createCompanyAndUser: CreateCompanyAndUser,
        private getCompanyAndUserInfo: GetCompanyAndUserInfo
    ) {}

    async create(request: CreateCompanyRequest): Promise<CreateCompanyResponse> {
        return await this.createCompany.execute(request);
    }
    async createCompanyAndUserService(request: CreateCompanyAndUserRequest): Promise<CreateCompanyAndUserResponse> {
        return await this.createCompanyAndUser.execute(request);
    }

    async getCompanyAndUserInfoService(request: getCompanyAndUserInfoRequest): Promise<getCompanyAndUserInfoResponse> {
        return await this.getCompanyAndUserInfo.execute(request);
    }

}