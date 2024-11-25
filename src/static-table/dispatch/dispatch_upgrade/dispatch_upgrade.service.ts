import { Injectable } from '@nestjs/common';
import { CreateDispatchUpgradeDto } from './dto/create-dispatch_upgrade.dto';
import { UpdateDispatchUpgradeDto } from './dto/update-dispatch_upgrade.dto';

@Injectable()
export class DispatchUpgradeService {
  create(createDispatchUpgradeDto: CreateDispatchUpgradeDto) {
    return 'This action adds a new dispatchUpgrade';
  }

  findAll() {
    return `This action returns all dispatchUpgrade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatchUpgrade`;
  }

  update(id: number, updateDispatchUpgradeDto: UpdateDispatchUpgradeDto) {
    return `This action updates a #${id} dispatchUpgrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatchUpgrade`;
  }
}
