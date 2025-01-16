import { Test, TestingModule } from '@nestjs/testing';
import { UserNpcFriendshipController } from './user_npc_friendship.controller';
import { UserNpcFriendshipService } from './user_npc_friendship.service';

describe('UserNpcFriendshipController', () => {
  let controller: UserNpcFriendshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserNpcFriendshipController],
      providers: [UserNpcFriendshipService],
    }).compile();

    controller = module.get<UserNpcFriendshipController>(UserNpcFriendshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
