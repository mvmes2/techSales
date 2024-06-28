import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "@app/repositories/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/user/prisma-user-repository";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { PrismaCompanyRepository } from "./prisma/repositories/company/prisma-company-repository";
import { SessionRepository } from "@app/repositories/session/session-repository";
import { PrismaSessionRepository } from "./prisma/repositories/session/prisma-session-repository";


@Module({
    imports: [],
    providers: [
        PrismaService,
    {
        provide: UserRepository,
        useClass: PrismaUserRepository
    },
    {
        provide: CompanyRepository,
        useClass: PrismaCompanyRepository
    },
    {
        provide: SessionRepository,
        useClass: PrismaSessionRepository
    }
],
exports: [
    UserRepository,
    CompanyRepository,
    SessionRepository,
    PrismaService
]
})
export class DatabaseModule {}