import { Test, TestingModule } from '@nestjs/testing';
import { UserGachaCheckService } from './user_gacha_check.service';

describe('UserGachaCheckService', () => {
  let service: UserGachaCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGachaCheckService],
    }).compile();

    service = module.get<UserGachaCheckService>(UserGachaCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
