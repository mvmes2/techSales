import { SessionRepository } from "@app/repositories/session/session-repository";
import { PrismaService } from "../../prisma.service";
import { Injectable } from "@nestjs/common";
import { Session } from "@app/entities/session/session";
import { PrismaSessionMapper } from "../../mappers/session/prisma-session-mapper";

@Injectable()
export class PrismaSessionRepository implements SessionRepository {
    constructor(private prismaService: PrismaService) {}
    
    async create(session: Session): Promise<void> {
        const rawSession = PrismaSessionMapper.toPrisma(session);
        console.log('consolando antes de inserir no banco: ', rawSession)
        await this.prismaService.session.create({
            data: rawSession
        });
        return;
    }

    async findAllByUserId(userid: string): Promise<Session[] | null> {
        const foundSession = await this.prismaService.session.findMany({ where: { user_id: userid }, include: { company: true, user: true } });
        if (!foundSession) {
            return null
        }
        return PrismaSessionMapper.toDomain(foundSession);
    }

    async update(session: Session): Promise<void> {
        const rawSession = PrismaSessionMapper.toPrisma(session);
        await this.prismaService.session.update({ where: { id: rawSession.id }, data: rawSession });
        return;
    }
}