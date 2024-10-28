import { Module } from '@nestjs/common';
import { LogUrlService } from './log_url.service';
import { LogUrlController } from './log_url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUrl } from './entities/log_url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogUrl])],
  exports: [LogUrlService],
  controllers: [LogUrlController],
  providers: [LogUrlService],
})
export class LogUrlModule {}
