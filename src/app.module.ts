import { Module } from '@nestjs/common';
import { HttpModule } from '@external/http/http.module';
import { DatabaseModule } from '@external/database/database.module';
import { UserModule } from '@app/use-cases/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CompanyModule } from '@app/use-cases/company/company.module';


@Module({
  imports: [HttpModule, DatabaseModule, UserModule, CompanyModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
],
  controllers: []
})
export class AppModule {}
