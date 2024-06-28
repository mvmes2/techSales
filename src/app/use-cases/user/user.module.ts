import { Module } from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { DatabaseModule } from '@external/database/database.module';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmail } from './get-user-by-email';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateUser,
    GetUserByEmail,
    UserService,
    JwtService
  ],
  exports: [
    CreateUser,
    UserService,
    GetUserByEmail,
    JwtService
  ]
  
})
export class UserModule {}
