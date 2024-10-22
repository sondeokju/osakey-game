import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Npc } from './entities/npc.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class NpcService {
  constructor(
    @InjectRepository(Npc)
    private readonly npcRepository: Repository<Npc>,
  ) {}

  getNpcRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Npc>(Npc) : this.npcRepository;
  }

  async getNpcAll(qr?: QueryRunner) {
    const npcRepository = this.getNpcRepository(qr);
    const result = await npcRepository.find({});
    return result;
  }
}
