import { Test, TestingModule } from '@nestjs/testing';
import { UserSecameMailService } from './user_secame_mail.service';

describe('UserSecameMailService', () => {
  let service: UserSecameMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSecameMailService],
    }).compile();

    service = module.get<UserSecameMailService>(UserSecameMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
