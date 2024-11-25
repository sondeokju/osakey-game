import { Controller } from '@nestjs/common';
import { EduListService } from './edu_list.service';

@Controller('edu-list')
export class EduListController {
  constructor(private readonly eduListService: EduListService) {}
}
