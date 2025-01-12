import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "../types/user.payload";
import { UserFromJwt } from "../types/user.fromJwt";
import { removeRandomCharsFromToken } from "@helpers/overshadowedToken";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_USER_AUTH_SECRET,
        });
    }
    

    async validate(payload: UserPayload): Promise<UserFromJwt> {
        return {
            id: payload.id,
            email: payload.email,
            name: payload.name,
            company_id: payload.company_id
        };
    }
}
