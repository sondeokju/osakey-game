import { Test, TestingModule } from '@nestjs/testing';
import { UserRentamaService } from './user_rentama.service';

describe('UserRentamaService', () => {
  let service: UserRentamaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRentamaService],
    }).compile();

    service = module.get<UserRentamaService>(UserRentamaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
