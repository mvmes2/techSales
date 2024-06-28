import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "@external/database/database.module";
import { AuthController } from "@external/http/controllers/auth/auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "@app/use-cases/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LoginValidationMiddleware } from "./middlewares/login-validation.middleware";
import { SessionModule } from "@app/use-cases/session/session.module";
import { SessionService } from "@app/use-cases/session/session.service";
@Module({
    imports: [DatabaseModule, UserModule, SessionModule, JwtModule.register({
        secret: process.env.JWT_USER_AUTH_SECRET,
        signOptions: { expiresIn: '7d' }
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionService, JwtStrategy],
    exports: [AuthService, LocalStrategy]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginValidationMiddleware).forRoutes('log-in');
    }
}
