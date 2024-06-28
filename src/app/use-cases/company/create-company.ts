import { UserRepository } from "@app/repositories/user/user-repository";
import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Injectable } from "@nestjs/common";
import { Company } from "@app/entities/company/company";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { CompanyAlreadyExists } from "./errors/company-cnpj-already-exists-error";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

export interface CreateCompanyRequest {
    company_name: string;
    owner_email: string;
    owner_name: string;
    cnpj: string
}

export interface CreateCompanyResponse {
    company: Company;
}

@Injectable()
export class CreateCompany {
    constructor(private companyRepository: CompanyRepository){}
    async execute(request: CreateCompanyRequest): Promise<CreateCompanyResponse> {
        const { company_name, owner_email, owner_name, cnpj } = request;

        const companyFound = await this.companyRepository.findByCnpj(cnpj);

        if (companyFound) {
            throw new CompanyAlreadyExists();
        } else {
            const company = new Company({
                company_name,
                owner_email: new Email(owner_email),
                owner_name,
                cnpj,
                created_at: spTimeZoneDate(new Date())
            });
    
            await this.companyRepository.create(company);
    
            return {
                company,
            }
        }       
    }
}