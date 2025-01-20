import { Injectable } from '@nestjs/common';
import { CreateUserDispatchRentamaDto } from './dto/create-user_dispatch_rentama.dto';
import { UpdateUserDispatchRentamaDto } from './dto/update-user_dispatch_rentama.dto';

@Injectable()
export class UserDispatchRentamaService {
  create(createUserDispatchRentamaDto: CreateUserDispatchRentamaDto) {
    return 'This action adds a new userDispatchRentama';
  }

  findAll() {
    return `This action returns all userDispatchRentama`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDispatchRentama`;
  }

  update(id: number, updateUserDispatchRentamaDto: UpdateUserDispatchRentamaDto) {
    return `This action updates a #${id} userDispatchRentama`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDispatchRentama`;
  }
}
