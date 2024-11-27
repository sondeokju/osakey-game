import { Injectable } from '@nestjs/common';
import { CreateDispatchTestDto } from './dto/create-dispatch_test.dto';
import { UpdateDispatchTestDto } from './dto/update-dispatch_test.dto';

@Injectable()
export class DispatchTestService {
  create(createDispatchTestDto: CreateDispatchTestDto) {
    return 'This action adds a new dispatchTest';
  }

  findAll() {
    return `This action returns all dispatchTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatchTest`;
  }

  update(id: number, updateDispatchTestDto: UpdateDispatchTestDto) {
    return `This action updates a #${id} dispatchTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatchTest`;
  }
}
