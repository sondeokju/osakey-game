import { Module } from '@nestjs/common';
import { ZLoginLogService } from './z_login_log.service';
import { ZLoginLogController } from './z_login_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZLoginLog } from './entities/z_login_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZLoginLog])],
  exports: [ZLoginLogService],
  controllers: [ZLoginLogController],
  providers: [ZLoginLogService],
})
export class ZLoginLogModule {}
