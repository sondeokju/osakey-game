import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfflineService } from './offline.service';

@Controller('offline')
export class OfflineController {
  constructor(private readonly offlineService: OfflineService) {}
}
