import { Test, TestingModule } from '@nestjs/testing';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';

describe('UserDispatchRentamaService', () => {
  let service: UserDispatchRentamaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDispatchRentamaService],
    }).compile();

    service = module.get<UserDispatchRentamaService>(UserDispatchRentamaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
