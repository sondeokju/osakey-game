import { Injectable } from '@nestjs/common';
import { CreateLogUrlDto } from './dto/create-log_url.dto';
import { UpdateLogUrlDto } from './dto/update-log_url.dto';

@Injectable()
export class LogUrlService {
  create(createLogUrlDto: CreateLogUrlDto) {
    return 'This action adds a new logUrl';
  }

  findAll() {
    return `This action returns all logUrl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logUrl`;
  }

  update(id: number, updateLogUrlDto: UpdateLogUrlDto) {
    return `This action updates a #${id} logUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} logUrl`;
  }
}
