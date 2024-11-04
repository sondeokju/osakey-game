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

  getNpcRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<NpcLocation>(NpcLocation)
      : this.npcLocationRepository;
  }

  async getNpcLocationAll(qr?: QueryRunner) {
    const npcRepository = this.getNpcRepository(qr);
    const result = await npcRepository.find({});
    return result;
  }
}
