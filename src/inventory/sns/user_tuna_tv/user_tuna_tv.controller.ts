import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { User } from 'src/users/decorator/user.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { Users } from 'src/users/entity/users.entity';

@Controller('tuna-tv')
export class UserTunaTvController {
  constructor(private readonly userTunaTvService: UserTunaTvService) {}

  @Post('save')
  @UseInterceptors(TransactionInterceptor)
  async tunaTvSave(
    @User() user: Users,
    @Body('tuna_title') tuna_title: string,
    @Body('ingame_kind') ingame_kind: string,
    @Body('select_1') select_1: number,
    @Body('select_2') select_2: number,
    @Body('select_3') select_3: number,
    @Body('score', ParseIntPipe) score: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userTunaTvService.tunaTvSave(
      user.user_id,
      tuna_title,
      ingame_kind,
      select_1,
      select_2,
      select_3,
      score,
      qr,
    );

    return JSON.stringify(result);
  }
  @Post('online/upload')
  @UseInterceptors(TransactionInterceptor)
  async tunaTvUpload(
    @User() user: Users,
    @Body('tunaTv_id') tunaTv_id: number,
    @Body('upload_txt') upload_txt: string,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userTunaTvService.tunaTvUpload(
      tunaTv_id,
      upload_txt,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('delete')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvDelete(
    @User() user: Users,
    @Body('tunaTv_id') tunaTv_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userTunaTvService.TunaTvDelete(tunaTv_id, qr);

    return JSON.stringify(result);
  }

  @Get('list')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userTunaTvService.TunaTvList(user.user_id, qr);

    return JSON.stringify(result);
  }

  @Get('upload/list')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvUploadList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.userTunaTvService.TunaTvUploadList(
      user.user_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('like/add')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvLikeAdd(
    @User() user: Users,
    @Body('tuna_tv_id') tuna_tv_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userTunaTvService.TunaTvLikeAdd(
      user.user_id,
      tuna_tv_id,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('like/delete')
  @UseInterceptors(TransactionInterceptor)
  async TunaTvLikeDelete(
    @User() user: Users,
    @Body('tuna_tv_id') tuna_tv_id: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.userTunaTvService.TunaTvLikeDelete(
      user.user_id,
      tuna_tv_id,
      qr,
    );

    return JSON.stringify(result);
  }
}
