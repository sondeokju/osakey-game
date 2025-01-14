import { Module } from '@nestjs/common';
import { UserMailService } from './user_mail.service';
import { UserMailController } from './user_mail.controller';
import { UserMail } from './entities/user_mail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserMail])],
  exports: [UserMailService],
  controllers: [UserMailController],
  providers: [UserMailService],
})
export class UserMailModule {}
