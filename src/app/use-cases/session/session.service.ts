import { Injectable } from "@nestjs/common";
import { CreateSession, CreateSessionRequest, CreateSessionResponse } from "./create-session";

@Injectable()
export class SessionService {
    constructor(
        private createSession: CreateSession,
        // private updateSession: UpdateSession,
    ) {}

    async create(request: CreateSessionRequest): Promise<CreateSessionResponse> {
        return await this.createSession.execute(request);
    }
    // async update(request: UpdateSessionRequest): Promise<UpdateSessionResponse> {
    //     return await this.updateSession.execute(request);
    // }

}