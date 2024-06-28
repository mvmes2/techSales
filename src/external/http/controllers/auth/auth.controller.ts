import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../../../../app/auth/guards/local-auth.guard";
import { AuthService } from "../../../../app/auth/auth.service";
import { User } from "@app/entities/user/user";
import { Request as ExpressRequest } from "express";
import { IsPublic } from "@app/auth/decorators/is-public.decorator";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";

interface AuthRequest extends ExpressRequest {
    user: User
}
@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authservice: AuthService) { }
    @IsPublic()
    @Post('log-in')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
        const userTokenSession = await this.authservice.login(req);
        console.log('logando token', userTokenSession)
        return userTokenSession
    }
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get('validate-token')

    async validateToken(@Request() req: any) {
        console.log('headers', req.headers)
        return
    }
}