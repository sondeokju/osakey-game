import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogUrlService } from './log_url.service';
import { CreateLogUrlDto } from './dto/create-log_url.dto';
import { UpdateLogUrlDto } from './dto/update-log_url.dto';

@Controller('log-url')
export class LogUrlController {
  constructor(private readonly logUrlService: LogUrlService) {}
}
