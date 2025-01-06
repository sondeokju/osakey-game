import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CollectionSuit } from './entities/collection_suit.entity';

@Injectable()
export class CollectionSuitService {
  constructor(
    @InjectRepository(CollectionSuit)
    private readonly collectionSuitRepository: Repository<CollectionSuit>,
  ) {}

  getCollectionSuitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CollectionSuit>(CollectionSuit)
      : this.collectionSuitRepository;
  }

  async getCollectionSuitAll(qr?: QueryRunner) {
    const collectionSuitRepository = this.getCollectionSuitRepository(qr);
    const result = await collectionSuitRepository.find({});
    return result;
  }

  async getCollectionSuit(id: number, qr?: QueryRunner) {
    const collectionSuitRepository = this.getCollectionSuitRepository(qr);
    const result = await collectionSuitRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
