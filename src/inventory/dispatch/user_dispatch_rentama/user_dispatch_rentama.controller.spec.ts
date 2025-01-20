import { Test, TestingModule } from '@nestjs/testing';
import { UserDispatchRentamaController } from './user_dispatch_rentama.controller';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';

describe('UserDispatchRentamaController', () => {
  let controller: UserDispatchRentamaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDispatchRentamaController],
      providers: [UserDispatchRentamaService],
    }).compile();

    controller = module.get<UserDispatchRentamaController>(UserDispatchRentamaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
