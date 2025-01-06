import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CollectionBossMemory } from './entities/collection_boss_memory.entity';

@Injectable()
export class CollectionBossMemoryService {
  constructor(
    @InjectRepository(CollectionBossMemory)
    private readonly collectionBossMemoryRepository: Repository<CollectionBossMemory>,
  ) {}

  getCollectionBossMemoryRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CollectionBossMemory>(CollectionBossMemory)
      : this.collectionBossMemoryRepository;
  }

  async getCollectionBossMemoryAll(qr?: QueryRunner) {
    const collectionBossMemoryRepository =
      this.getCollectionBossMemoryRepository(qr);
    const result = await collectionBossMemoryRepository.find({});
    return result;
  }

  async getCollectionBossMemory(id: number, qr?: QueryRunner) {
    const collectionBossMemoryRepository =
      this.getCollectionBossMemoryRepository(qr);
    const result = await collectionBossMemoryRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
