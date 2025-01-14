import { Injectable } from '@nestjs/common';
import { CreateSystemNoticeDto } from './dto/create-system_notice.dto';
import { UpdateSystemNoticeDto } from './dto/update-system_notice.dto';

@Injectable()
export class SystemNoticeService {
  create(createSystemNoticeDto: CreateSystemNoticeDto) {
    return 'This action adds a new systemNotice';
  }

  findAll() {
    return `This action returns all systemNotice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemNotice`;
  }

  update(id: number, updateSystemNoticeDto: UpdateSystemNoticeDto) {
    return `This action updates a #${id} systemNotice`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemNotice`;
  }
}
