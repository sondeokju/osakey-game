import { Controller } from '@nestjs/common';
import { InvenService } from './inven.service';

@Controller('inven')
export class InvenController {
  constructor(private readonly invenService: InvenService) {}
}
