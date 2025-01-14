import { Module } from '@nestjs/common';
import { UserMailService } from './user_mail.service';
import { UserMailController } from './user_mail.controller';

@Module({
  controllers: [UserMailController],
  providers: [UserMailService],
})
export class UserMailModule {}
