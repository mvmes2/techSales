import { Module } from '@nestjs/common';
import { DatabaseModule } from '@external/database/database.module';
import { CreateSession } from './create-session';


@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateSession,
  ],
  exports: [
    CreateSession,
  ]
  
})
export class SessionModule {}
