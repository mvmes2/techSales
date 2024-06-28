import { Injectable } from "@nestjs/common";
import { EmailOrPasswordIncorrect } from "./errors/email-password-incorrect-error";
import * as bcrypt from 'bcrypt';
import { UserNotFound } from "@app/use-cases/user/errors/user-not-found-error";
import { UserService } from "@app/use-cases/user/user.service";
import { User } from "@app/entities/user/user";
import { UserPayload } from "./types/user.payload";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "./types/user.token";
import { SessionService } from "@app/use-cases/session/session.service";
import { Session } from "@app/entities/session/session";
import { CONFIGS } from "src/configs/globalConfigs";
import { addRandomCharsToToken } from "@helpers/overshadowedToken";

export interface UserTokenSession {
    user_token: string;
    session: {
        id: string;
        session_access_token: string;
    }
}
@Injectable()
export class AuthService {
    constructor(private userService: UserService, 
                private jwtService: JwtService,
                private sessionService: SessionService
    ) {}

     async login(req: any): Promise<UserTokenSession> {

        try {
            const user = req.user;
            const payload: UserPayload = {
                id: user._id,
                name: user.props.user_name,
                email: user.props.user_email,
                company_id: user.props.company_id,
                company_name: user.props.company.company_name,
                user_level: user.props.user_level
            }
            
            const generatedUserToken = this.jwtService.sign(payload, { secret: process.env.JWT_USER_AUTH_SECRET, expiresIn: CONFIGS.userJwtExpires });
            const shadowedToken = addRandomCharsToToken(generatedUserToken);

            const session = new Session({
                browser: req.headers['user-agent'],
                company_id: user.props.company_id,
                user_id: user._id,
                ip_address: 'null',
                token: shadowedToken,
                location: 'null',
            });

           const createdSession = await this.sessionService.create(session);

            return {
                user_token: shadowedToken,
                session: {
                    id: createdSession.id,
                    session_access_token: session.token
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    async validateUser(email: string, password: string) {
       
       try {
        const { user } = await this.userService.getByEmail({email});

        const isValidPassword = await bcrypt.compare(password, user.user_password);

        if (!isValidPassword) {
            throw new EmailOrPasswordIncorrect;
        }
        return {
            ...user
        }
       } catch (err) {
        if (err instanceof UserNotFound) {
            throw new EmailOrPasswordIncorrect;
          } else {
            throw err;
          }
       }
    }
}