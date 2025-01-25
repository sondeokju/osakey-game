import { Controller } from '@nestjs/common';
import { SecameMailService } from './secame_mail.service';

@Controller('suit')
export class SuitController {
  constructor(private readonly secameMailService: SecameMailService) {}
}
