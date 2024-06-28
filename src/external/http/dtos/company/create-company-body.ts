import { IsNotEmpty, IsNumber, IsString, Length, ValidateNested } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";
import { Type } from "class-transformer";

export class CreateCompanyBody {
    @IsNotEmpty()
    @Length(3, 100)
    @IsString()
    company_name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(13, 15)
    cnpj: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 100)
    owner_name: string;

    @IsEmail()
    @IsNotEmpty()
    owner_email: string;
}

export class CompanyCreateUserBody {
    @IsNotEmpty()
    @Length(4, 100)
    @IsString()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @Length(6, 20)
    @IsString()
    password: string;
    @Length(10, 12)
    @IsNotEmpty()
    @IsString()
    user_cpf: string;
}

export class CreateCompanyAndUserBody {
    @ValidateNested()
    @Type(() => CreateCompanyBody)
    company: CreateCompanyBody;

    @ValidateNested()
    @Type(() => CompanyCreateUserBody)
    user: CompanyCreateUserBody;
}