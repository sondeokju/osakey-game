import { Test, TestingModule } from '@nestjs/testing';
import { UserNpcFriendshipService } from './user_npc_friendship.service';

describe('UserNpcFriendshipService', () => {
  let service: UserNpcFriendshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNpcFriendshipService],
    }).compile();

    service = module.get<UserNpcFriendshipService>(UserNpcFriendshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
