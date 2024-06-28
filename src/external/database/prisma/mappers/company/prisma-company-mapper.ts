
import { Company } from "@app/entities/company/company";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Company as RawCompany} from '@prisma/client';

export class PrismaCompanyMapper {
    static toPrisma(company: Company) {
       return {
            id: company.id,
            company_name: company.company_name,
            cnpj: company.cnpj,
            owner_name: company.owner_name,
            owner_email: company.owner_email.value,
            product_key: company.product_key,
            updated_at: company.updated_at,
            created_at: company.created_at
        };
    }

    static toDomain(raw: RawCompany) {
        return new Company({
            owner_email: new Email(raw.owner_email),
            company_name: raw.company_name,
            owner_name: raw.owner_name,
            cnpj: raw.cnpj,
            product_key: raw.product_key,
            created_at: raw.created_at,
            updated_at: raw.updated_at,
            deleted_at: raw.deleted_at
        }, raw.id);
    }
}