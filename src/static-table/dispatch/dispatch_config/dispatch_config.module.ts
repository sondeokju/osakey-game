import { Module } from '@nestjs/common';
import { DispatchConfigService } from './dispatch_config.service';
import { DispatchConfigController } from './dispatch_config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchConfig } from './entities/dispatch_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispatchConfig])],
  exports: [DispatchConfigService],
  controllers: [DispatchConfigController],
  providers: [DispatchConfigService],
})
export class DispatchConfigModule {}
