import { Controller } from '@nestjs/common';
import { SecameMailService } from './secame_mail.service';

@Controller('suit')
export class SecameMailController {
  constructor(private readonly secameMailService: SecameMailService) {}
}
