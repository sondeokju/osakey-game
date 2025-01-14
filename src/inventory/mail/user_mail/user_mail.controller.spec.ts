import { Test, TestingModule } from '@nestjs/testing';
import { UserMailController } from './user_mail.controller';
import { UserMailService } from './user_mail.service';

describe('UserMailController', () => {
  let controller: UserMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMailController],
      providers: [UserMailService],
    }).compile();

    controller = module.get<UserMailController>(UserMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
