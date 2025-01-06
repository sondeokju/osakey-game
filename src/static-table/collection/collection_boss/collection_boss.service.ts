import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CollectionBoss } from './entities/collection_boss.entity';

@Injectable()
export class CollectionBossService {
  constructor(
    @InjectRepository(CollectionBoss)
    private readonly collectionBossRepository: Repository<CollectionBoss>,
  ) {}

  getCollectionBossRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CollectionBoss>(CollectionBoss)
      : this.collectionBossRepository;
  }

  async getCollectionBossAll(qr?: QueryRunner) {
    const collectionBossRepository = this.getCollectionBossRepository(qr);
    const result = await collectionBossRepository.find({});
    return result;
  }

  async getCollectionBoss(id: number, qr?: QueryRunner) {
    const collectionBossRepository = this.getCollectionBossRepository(qr);
    const result = await collectionBossRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
