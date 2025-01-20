import { Test, TestingModule } from '@nestjs/testing';
import { UserSecameMailController } from './user_secame_mail.controller';
import { UserSecameMailService } from './user_secame_mail.service';

describe('UserSecameMailController', () => {
  let controller: UserSecameMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSecameMailController],
      providers: [UserSecameMailService],
    }).compile();

    controller = module.get<UserSecameMailController>(UserSecameMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
