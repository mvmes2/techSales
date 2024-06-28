import { JwtService } from "@nestjs/jwt"
import { CONFIGS } from "src/configs/globalConfigs";
import { addRandomCharsToToken } from "./overshadowedToken";


export const generateNewJwtShadowd = (payload: any) => {
    const jwtService =  new JwtService;

    const generatedUserToken = jwtService.sign(payload, { secret: process.env.JWT_USER_AUTH_SECRET, expiresIn: CONFIGS.userJwtExpires });
    const shadowedToken = addRandomCharsToToken(generatedUserToken);

    return shadowedToken;
}