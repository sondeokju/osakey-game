import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerConfig } from './entities/server_config.entity';
import { ServerConfigService } from './server_config.service';
import { ServerConfigController } from './server_config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServerConfig])],
  exports: [ServerConfigService],
  controllers: [ServerConfigController],
  providers: [ServerConfigService],
})
export class ServerConfigModule {}
