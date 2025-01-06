import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CollectionEquip } from './entities/collection_equip.entity';

@Injectable()
export class CollectionEquipService {
  constructor(
    @InjectRepository(CollectionEquip)
    private readonly collectionEquipRepository: Repository<CollectionEquip>,
  ) {}

  getCollectionEquipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CollectionEquip>(CollectionEquip)
      : this.collectionEquipRepository;
  }

  async getCollectionEquipAll(qr?: QueryRunner) {
    const collectionEquipRepository = this.getCollectionEquipRepository(qr);
    const result = await collectionEquipRepository.find({});
    return result;
  }

  async getCollectionEquip(id: number, qr?: QueryRunner) {
    const collectionEquipRepository = this.getCollectionEquipRepository(qr);
    const result = await collectionEquipRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }
}
