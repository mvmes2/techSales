import { Company } from "@app/entities/company/company";


export abstract class CompanyRepository {
    abstract create(company: Company): Promise<void>;
    abstract findByCnpj(cnpj: string): Promise<Company | null>;
    abstract findById(id: string): Promise<Company | null>;
}