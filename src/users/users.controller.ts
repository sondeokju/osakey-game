import {
  Body,
  //ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { Roles } from './decorator/roles.decorator';
// import { RolesEnum } from './const/roles.const';
import { User } from './decorator/user.decorator';
import { Users } from './entity/users.entity';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
// import { TakeMoneyDto } from './dto/take-money.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@Get()
  //@Roles(RolesEnum.ADMIN)
  /**
     * serialization -> 직렬화 -> 현재 시스템에서 사용되는 (NestJS) 데이터의 구조를 다른 시스템에서도 쉽게
     *                  사용 할 수 있는 포맷으로 변환
     *                       -> class의 object에서 JSON 포맷으로 변환
     * deserialization -> 역직렬화
  환   */
  // getUsers(@User() user: Users) {
  //   return this.usersService.getAllUsers();
  // }

  @Post('secame_credit/reward')
  @UseInterceptors(TransactionInterceptor)
  async secamCreditReward(
    @User() user: Users,
    @Body('secame_credit') secame_credit: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.secamCreditReward(
      user.user_id,
      secame_credit,
      qr,
    );

    return result;
  }

  @Post('nickname')
  @UseInterceptors(TransactionInterceptor)
  async updateNickname(
    @User() user: Users,
    @Body('nickname') nickname: string,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.updateNickname(
      user.user_id,
      nickname,
      qr,
    );

    return result;
  }

  @Post('prologue')
  @UseInterceptors(TransactionInterceptor)
  async updatePrologue(
    @User() user: Users,
    @Body('prologue_yn') prologue_yn: string,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.updatePrologue(
      user.user_id,
      prologue_yn,
      qr,
    );

    return result;
  }

  @Get('/root')
  test() {
    console.log('root');

    return JSON.stringify('hello osakey');
  }

  @Get('time')
  getMe() {
    console.log('time');
    const serverTime = new Date().toString();

    const result = {
      time: serverTime,
    };
    return JSON.stringify(result);
  }

  @Get('redis/get')
  async redisGet() {
    console.log('redis/get');
    const result = await this.usersService.getUserKey();
    return JSON.stringify(result);
  }

  @Post('redis/set')
  async redisSet() {
    console.log('redis/set');
    const result = await this.usersService.setUserKey();
    return JSON.stringify(result);
  }

  @Get('ban')
  @UseInterceptors(TransactionInterceptor)
  async offlineRewardList(@User() user: Users, @QueryRunner() qr: QR) {
    const result = this.usersService.getUserBan(user.user_id, qr);
    return result;
  }

  @Post('redis/del')
  async redisDel() {
    console.log('redis/del');
    const result = await this.usersService.delUserKey();
    return JSON.stringify(result);
  }

  @Get('data')
  @UseInterceptors(TransactionInterceptor)
  async getUserData(
    @User() user: Users,
    @QueryRunner() qr: QR,
    //@Query('includeNotConfirmed', new DefaultValuePipe(false), ParseBoolPipe)
    //includeNotConfirmed: boolean,
  ) {
    const result = await this.usersService.getUserData(user.user_id, qr);
    return result;
  }

  @Get('with-dia')
  @UseInterceptors(TransactionInterceptor)
  async getUserWithDia(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.usersService.getUserWithDia(user.user_id, qr);
    return result;
  }

  @Get('me')
  @UseInterceptors(TransactionInterceptor)
  async getMeTest(
    @User() user: Users,
    @QueryRunner() qr: QR,
    //@Query('includeNotConfirmed', new DefaultValuePipe(false), ParseBoolPipe)
    //includeNotConfirmed: boolean,
  ) {
    const result = await this.usersService.getMe(user.user_id, qr);
    return JSON.stringify(result);
  }

  @Get('base')
  @UseInterceptors(TransactionInterceptor)
  async getUserBase(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.usersService.getUserBase(user.user_id, qr);
    return JSON.stringify(result);
  }

  @Get('money')
  @UseInterceptors(TransactionInterceptor)
  async getUserMoney(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.usersService.getUserMoney(user.user_id, qr);
    return JSON.stringify(result);
  }

  @Post('reset')
  @UseInterceptors(TransactionInterceptor)
  async resetUser(@User() user: Users, @QueryRunner() qr: QR) {
    const result = await this.usersService.resetUser(user.id, qr);
    return JSON.stringify(result);
  }

  @Patch('take/gord')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeGord(
    @User() user: Users,
    @Body('gord', ParseIntPipe) gord: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeGord(
      user.user_id,
      gord,
      qr,
    );

    return JSON.stringify(result);
  }

  @Patch('take/exp')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeGordExp(
    @User() user: Users,
    @Body('exp', ParseIntPipe) exp: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeExp(user.id, exp, qr);

    return result;
  }

  @Patch('take/diamondpaid')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeDiamond(
    @User() user: Users,
    @Body('diamond_paid', ParseIntPipe) diamond_paid: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeDiamondPaid(
      user.id,
      diamond_paid,
      qr,
    );

    return result;
  }

  @Patch('take/diamondfree')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeDiamondFree(
    @User() user: Users,
    @Body('diamond_free', ParseIntPipe) diamond_free: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeDiamondFree(
      user.id,
      diamond_free,
      qr,
    );

    return result;
  }

  // @Post('create/account')
  // @UseInterceptors(TransactionInterceptor)
  // async createUserIDList(@QueryRunner() qr: QR) {
  //   const result = await this.usersService.createUserIDList(qr);

  //   return result;
  // }

  @Patch('take/battery')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeBattery(
    @User() user: Users,
    @Body('battery', ParseIntPipe) battery: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeBattery(
      user.id,
      battery,
      qr,
    );

    return result;
  }

  @Patch('take/revivecoin')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeReviveCoin(
    @User() user: Users,
    @Body('revive_coin', ParseIntPipe) revive_coin: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeReviveCoin(
      user.id,
      revive_coin,
      qr,
    );

    return result;
  }

  @Patch('take/gord-exp-battery')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeGordExpBattery(
    @User() user: Users,
    @Body('gord', ParseIntPipe) gord: number,
    @Body('exp', ParseIntPipe) exp: number,
    @Body('battery', ParseIntPipe) battery: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeGordExpBattery(
      user.id,
      gord,
      exp,
      battery,
      qr,
    );

    return result;
  }

  @Patch('pay/gord-exp-battery')
  @UseInterceptors(TransactionInterceptor)
  async patchPayGordExpBattery(
    @User() user: Users,
    @Body('gord', ParseIntPipe) gord: number,
    @Body('exp', ParseIntPipe) exp: number,
    @Body('battery', ParseIntPipe) battery: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchPayGordExpBattery(
      user.id,
      gord,
      exp,
      battery,
      qr,
    );

    return result;
  }

  @Patch('take/diamondpaid-diamondfree-revivecoin')
  @UseInterceptors(TransactionInterceptor)
  async patchTakeDiamondPaidFreeReviveCoin(
    @User() user: Users,
    @Body('diamond_paid', ParseIntPipe) diamond_paid: number,
    @Body('diamond_free', ParseIntPipe) diamond_free: number,
    @Body('revive_coin', ParseIntPipe) revive_coin: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchTakeDiamondPaidFreeReviveCoin(
      user.id,
      diamond_paid,
      diamond_free,
      revive_coin,
      qr,
    );

    return result;
  }

  @Patch('pay/diamondpaid-diamondfree-revivecoin')
  @UseInterceptors(TransactionInterceptor)
  async patchPayDiamondReviveCoin(
    @User() user: Users,
    @Body('diamond_paid', ParseIntPipe) diamond_paid: number,
    @Body('revive_coin', ParseIntPipe) revive_coin: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.patchPayDiamondReviveCoin(
      user.id,
      diamond_paid,
      revive_coin,
      qr,
    );

    return result;
  }

  // @Patch('gord/:qty/update')
  // @UseInterceptors(TransactionInterceptor)
  // async patchUpdateGord(
  //   @User() user: Users,
  //   @Param('qty', ParseIntPipe) gord: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   await this.usersService.updateGord(user.id, gord, qr);

  //   return true;
  // }

  @Post()
  postUser(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser({
      nickname,
      email,
      password,
    });
  }

  @Post('battery/reduce')
  @UseInterceptors(TransactionInterceptor)
  async reduceBattery(
    @User() user: Users,
    @Body('battery') battery: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.reduceBattery(
      user.user_id,
      battery,
      qr,
    );

    return JSON.stringify(result);
  }

  @Post('language')
  @UseInterceptors(TransactionInterceptor)
  async languageUpdate(
    @User() user: Users,
    @Body('language') language: string,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.usersService.languageUpdate(
      user.user_id,
      language,
      qr,
    );

    return JSON.stringify(result);
  }

  //testtest
}
