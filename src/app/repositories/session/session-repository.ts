import { Session } from "@app/entities/session/session";


export abstract class SessionRepository {
    abstract create(session: Session): Promise<void>;
    // abstract findById(sessionid: string): Promise<Session | null>;
    abstract update(session: Session): Promise<void>;
    abstract findAllByUserId(userid: string): Promise<Session[]>;
}