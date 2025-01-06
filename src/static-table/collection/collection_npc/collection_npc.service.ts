import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CollectionNpc } from './entities/collection_npc.entity';

@Injectable()
export class CollectionNpcService {
  constructor(
    @InjectRepository(CollectionNpc)
    private readonly collectionNpcRepository: Repository<CollectionNpc>,
  ) {}

  getCollectionNpcRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CollectionNpc>(CollectionNpc)
      : this.collectionNpcRepository;
  }

  async getCollectionNpcAll(qr?: QueryRunner) {
    const collectionNpcRepository = this.getCollectionNpcRepository(qr);
    const result = await collectionNpcRepository.find({});
    return result;
  }

  async getCollectionNpc(id: number, qr?: QueryRunner) {
    const collectionNpcRepository = this.getCollectionNpcRepository(qr);
    const result = await collectionNpcRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
