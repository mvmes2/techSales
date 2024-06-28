import { Injectable } from "@nestjs/common";
import { Session } from "@app/entities/session/session";
import { SessionRepository } from "@app/repositories/session/session-repository";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

export interface CreateSessionRequest {
    company_id: string;
    user_id: string;
    token: string;
    ip_address: string;
    location: string;
    browser: string;
}

export interface CreateSessionResponse {
    id: string;
}

@Injectable()
export class CreateSession {
    constructor(private sessionRepository: SessionRepository) { }
    async execute(session: CreateSessionRequest): Promise<CreateSessionResponse | any> {
        try {
            const { company_id, user_id, token, ip_address, location, browser } = session;

            const findAllUserSessions = await this.sessionRepository.findAllByUserId(user_id);
            const sessionToUpdate = findAllUserSessions.find((someSession => someSession.browser == browser));

            if (sessionToUpdate) {
                
                sessionToUpdate.updated_at = spTimeZoneDate(new Date());
                sessionToUpdate.token = token;

                await this.sessionRepository.update(sessionToUpdate);

                return { id: sessionToUpdate.id }
            } else {
                const session = new Session({
                    browser,
                    company_id,
                    ip_address: 'null',
                    location: 'null',
                    token,
                    user_id,
                    created_at: spTimeZoneDate(new Date())
                });

                await this.sessionRepository.create(session);
                return { id: session.id }
            }
        } catch (err) {
            console.log(err);
        }
    }
}