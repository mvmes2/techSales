import { Module } from '@nestjs/common';
import { DatabaseModule } from '@external/database/database.module';
import { CreateCompany } from './create-company';
import { CompanyService } from './company.service';
import { CreateCompanyAndUser } from './create-company-user';
import { GetCompanyAndUserInfo } from './get-company-user-info';


@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateCompany,
    CreateCompanyAndUser,
    CompanyService,
    GetCompanyAndUserInfo
  ],
  exports: [
    CreateCompany,
    CreateCompanyAndUser,
    CompanyService,
    GetCompanyAndUserInfo
  ]
  
})
export class CompanyModule {}
