import { Module } from '@nestjs/common';
import { UserSecameMailService } from './user_secame_mail.service';
import { UserSecameMailController } from './user_secame_mail.controller';

@Module({
  controllers: [UserSecameMailController],
  providers: [UserSecameMailService],
})
export class UserSecameMailModule {}
