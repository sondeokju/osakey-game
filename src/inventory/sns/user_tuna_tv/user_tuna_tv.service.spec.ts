import { Test, TestingModule } from '@nestjs/testing';
import { UserTunaTvService } from './user_tuna_tv.service';

describe('UserTunaTvService', () => {
  let service: UserTunaTvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTunaTvService],
    }).compile();

    service = module.get<UserTunaTvService>(UserTunaTvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
