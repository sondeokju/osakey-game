import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryRunner, Repository } from 'typeorm';
import { NpcLocation } from './entities/npc_location.entity';

@Injectable()
export class NpcLocationService {
  constructor(
    @InjectRepository(NpcLocation)
    private readonly npcLocationRepository: Repository<NpcLocation>,
  ) {}

  getNpcLocationRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<NpcLocation>(NpcLocation)
      : this.npcLocationRepository;
  }

  async getNpcLocationAll(qr?: QueryRunner) {
    const npcLocationRepository = this.getNpcLocationRepository(qr);
    const result = await npcLocationRepository.find({});
    return result;
  }
}
