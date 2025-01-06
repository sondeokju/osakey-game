import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  getCollectionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Collection>(Collection)
      : this.collectionRepository;
  }

  async getCollectionAll(qr?: QueryRunner) {
    const collectionRepository = this.getCollectionRepository(qr);
    const result = await collectionRepository.find({});
    return result;
  }

  async getCollection(id: number, qr?: QueryRunner) {
    const collectionRepository = this.getCollectionRepository(qr);
    const result = await collectionRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
