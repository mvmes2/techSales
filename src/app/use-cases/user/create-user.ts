import { UserRepository } from "@app/repositories/user/user-repository";
import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Injectable } from "@nestjs/common";
import { UserEmailAlreadyInUse } from "./errors/user-email-already-in-use-error";
import * as bcrypt from 'bcrypt';
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    company_id: string;
    user_cpf: string;
    user_level: number;
}

export interface CreateUserResponse {
    user: User;
}

@Injectable()
export class CreateUser {
    constructor(private userRepository: UserRepository){}
    async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, password, company_id, user_cpf, user_level } = request;

        const userFound = await this.userRepository.findByEmail(email);

        if (userFound) {
            throw new UserEmailAlreadyInUse();
        } else {
            const user = new User({
                user_name: name,
                user_email: new Email(email),
                user_password: await bcrypt.hash(password, 11),
                company_id,
                user_cpf,
                user_level,
                created_at: spTimeZoneDate(new Date())
            });

            await this.userRepository.create(user);
    
            return {
                user,
            }
        }       
    }
}