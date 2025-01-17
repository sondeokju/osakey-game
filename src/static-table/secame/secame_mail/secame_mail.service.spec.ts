import { Test, TestingModule } from '@nestjs/testing';
import { SecameMailService } from './secame_mail.service';

describe('SecameMailService', () => {
  let service: SecameMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecameMailService],
    }).compile();

    service = module.get<SecameMailService>(SecameMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
