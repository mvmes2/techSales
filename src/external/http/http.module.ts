import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { DatabaseModule } from '@external/database/database.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/use-cases/user/user.module';
import { CompanyModule } from '@app/use-cases/company/company.module';
import { CompanyController } from './controllers/company/company.controller';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CompanyModule],
  controllers: [UserController, AuthController, CompanyController],
  providers: []
  
})
export class HttpModule {}
