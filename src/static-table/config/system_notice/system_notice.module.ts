import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemNoticeService } from './system_notice.service';
import { SystemNoticeController } from './system_notice.controller';
import { SystemNotice } from './entities/system_notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemNotice])],
  exports: [SystemNoticeService],
  controllers: [SystemNoticeController],
  providers: [SystemNoticeService],
})
export class SystemNoticeModule {}
