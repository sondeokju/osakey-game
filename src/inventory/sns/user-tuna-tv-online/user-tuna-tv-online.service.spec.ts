import { Test, TestingModule } from '@nestjs/testing';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';

describe('UserTunaTvOnlineService', () => {
  let service: UserTunaTvOnlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTunaTvOnlineService],
    }).compile();

    service = module.get<UserTunaTvOnlineService>(UserTunaTvOnlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
