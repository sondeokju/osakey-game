import { Injectable } from '@nestjs/common';
import { CreateZLoginLogDto } from './dto/create-z_login_log.dto';
import { UpdateZLoginLogDto } from './dto/update-z_login_log.dto';

@Injectable()
export class ZLoginLogService {
  create(createZLoginLogDto: CreateZLoginLogDto) {
    return 'This action adds a new zLoginLog';
  }

  findAll() {
    return `This action returns all zLoginLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zLoginLog`;
  }

  update(id: number, updateZLoginLogDto: UpdateZLoginLogDto) {
    return `This action updates a #${id} zLoginLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} zLoginLog`;
  }
}
