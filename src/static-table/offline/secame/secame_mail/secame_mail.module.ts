import { Module } from '@nestjs/common';
import { SecameMailService } from './secame_mail.service';
import { SecameMailController } from './secame_mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecameMail } from './entities/secame_mail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecameMail])],
  exports: [SecameMailService],
  controllers: [SecameMailController],
  providers: [SecameMailService],
})
export class SecameMailModule {}
