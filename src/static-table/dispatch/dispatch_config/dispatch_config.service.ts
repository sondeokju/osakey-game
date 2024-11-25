import { Injectable } from '@nestjs/common';
import { CreateDispatchConfigDto } from './dto/create-dispatch_config.dto';
import { UpdateDispatchConfigDto } from './dto/update-dispatch_config.dto';

@Injectable()
export class DispatchConfigService {
  create(createDispatchConfigDto: CreateDispatchConfigDto) {
    return 'This action adds a new dispatchConfig';
  }

  findAll() {
    return `This action returns all dispatchConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatchConfig`;
  }

  update(id: number, updateDispatchConfigDto: UpdateDispatchConfigDto) {
    return `This action updates a #${id} dispatchConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatchConfig`;
  }
}
