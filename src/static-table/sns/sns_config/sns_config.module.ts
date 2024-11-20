import { Module } from '@nestjs/common';
import { SnsConfigService } from './sns_config.service';
import { SnsConfigController } from './sns_config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnsConfig } from './entities/sns_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnsConfig])],
  exports: [SnsConfigService],
  controllers: [SnsConfigController],
  providers: [SnsConfigService],
})
export class SnsConfigModule {}
