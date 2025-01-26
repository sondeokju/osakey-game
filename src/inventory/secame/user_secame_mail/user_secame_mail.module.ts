import { Module } from '@nestjs/common';
import { UserSecameMailService } from './user_secame_mail.service';
import { UserSecameMailController } from './user_secame_mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSecameMail } from './entities/user_secame_mail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSecameMail])],
  exports: [UserSecameMailService],
  controllers: [UserSecameMailController],
  providers: [UserSecameMailService],
})
export class UserSecameMailModule {}
