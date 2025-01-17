import { Test, TestingModule } from '@nestjs/testing';
import { SecameMailController } from './secame_mail.controller';
import { SecameMailService } from './secame_mail.service';

describe('SecameMailController', () => {
  let controller: SecameMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecameMailController],
      providers: [SecameMailService],
    }).compile();

    controller = module.get<SecameMailController>(SecameMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
