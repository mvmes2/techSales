import { Company } from "@app/entities/company/company";
import { User } from "@app/entities/user/user";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { UserRepository } from "@app/repositories/user/user-repository";
import { generateNewJwtShadowd } from "@helpers/generateJwtShadowed";
import { Injectable } from "@nestjs/common";


export interface getCompanyAndUserInfoRequest {
    companyId: string;
    userId: string;
}

export interface getCompanyAndUserInfoResponse {
    user: string;
    company: string;
}

@Injectable()
export class GetCompanyAndUserInfo {
    constructor(
        private companyRepository: CompanyRepository,
        private userRepository: UserRepository
    ) {}
    async execute(request: getCompanyAndUserInfoRequest): Promise<getCompanyAndUserInfoResponse> {
        const { companyId, userId } = request;
        
        const companyFound = await this.companyRepository.findById(companyId);
        const userFound = await this.userRepository.findById(userId);

        console.log('como vem o user encontrado? ', userFound.toPlainObject())
        console.log('como vem a company encontrado? ', companyFound)

        return {
            user: generateNewJwtShadowd(userFound.toPlainObject()),
            company: generateNewJwtShadowd(companyFound)
        }
    }
}