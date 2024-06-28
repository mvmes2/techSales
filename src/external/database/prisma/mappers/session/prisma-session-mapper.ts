import { Session as DomainSession } from "@app/entities/session/session";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Company, User } from "@prisma/client";
import { create } from "domain";

export type RawSession = {
    id: string;
    company_id: string;
    user_id: string;
    token: string;
    ip_address: string;
    location: string;
    browser: string;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
    company?: Company;
    user?: User;
};

export class PrismaSessionMapper {
    static toPrisma(session: DomainSession) {
       return {
            id: session.id,
            company_id: session.company_id,
            user_id: session.user_id,
            token: session.token,
            ip_address: session.ip_address,
            location: session.location,
            browser: session.browser,
            updated_at: session.updated_at,
            created_at: session.created_at
        };
    }

    static toDomain(raw: RawSession[]): DomainSession[] {

            return raw.map((raw) => {
                const company = raw.company
                    ? {
                        id: raw.company.id,
                        company_name: raw.company.company_name,
                        cnpj: raw.company.cnpj,
                        owner_name: raw.company.owner_name,
                        owner_email: new Email(raw.company.owner_email),
                        product_key: raw.company.product_key,
                        created_at: raw.company.created_at,
                        deleted_at: raw.company.deleted_at,
                        updated_at: raw.company.updated_at,
                    }
                    : undefined;
    
                const user = raw.user
                    ? {
                        id: raw.user.id,
                        company_id: raw.user.company_id,
                        user_name: raw.user.user_name,
                        user_email: new Email(raw.user.user_email),
                        user_password: raw.user.user_password,
                        user_cpf: raw.user.user_cpf,
                        user_level: raw.user.user_level,
                        created_at: raw.user.created_at,
                        updated_at: raw.user.updated_at,
                        deleted_at: raw.user.deleted_at
                    }
                    : undefined;
    
                return new DomainSession({
                    company_id: raw.company_id,
                    user_id: raw.user_id,
                    token: raw.token,
                    ip_address: raw.ip_address,
                    location: raw.location,
                    browser: raw.browser,
                    created_at: raw.created_at,
                    updated_at: raw.updated_at,
                    deleted_at: raw.deleted_at,
                    company: company,
                    user: user,
                }, raw.id);
            });
    }
}
