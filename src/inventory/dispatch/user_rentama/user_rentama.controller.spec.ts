import { Test, TestingModule } from '@nestjs/testing';
import { UserRentamaController } from './user_rentama.controller';
import { UserRentamaService } from './user_rentama.service';

describe('UserRentamaController', () => {
  let controller: UserRentamaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRentamaController],
      providers: [UserRentamaService],
    }).compile();

    controller = module.get<UserRentamaController>(UserRentamaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
