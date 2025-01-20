import { Test, TestingModule } from '@nestjs/testing';
import { UserMembershipService } from './user_membership.service';

describe('UserMembershipService', () => {
  let service: UserMembershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMembershipService],
    }).compile();

    service = module.get<UserMembershipService>(UserMembershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
