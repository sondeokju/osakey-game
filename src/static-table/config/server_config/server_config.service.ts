import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ServerConfig } from './entities/server_config.entity';

@Injectable()
export class ServerConfigService {
  constructor(
    @InjectRepository(ServerConfig)
    private readonly serverConfigRepository: Repository<ServerConfig>,
  ) {}

  getServerConfigRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<ServerConfig>(ServerConfig)
      : this.serverConfigRepository;
  }

  async getServerConfigAll(qr?: QueryRunner) {
    const serverConfigRepository = this.getServerConfigRepository(qr);
    const result = await serverConfigRepository.find({});
    return result;
  }

  async getServerConfig(server_config_id: number, qr?: QueryRunner) {
    const serverConfigRepository = this.getServerConfigRepository(qr);
    const result = await serverConfigRepository.findOne({
      where: {
        server_config_id,
      },
    });

    return result;
  }
}
