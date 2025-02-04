import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
//import { ItemService } from 'src/static-table/item/item.service';
import { GachaService } from 'src/static-table/draw/gacha/gacha.service';
import { GachaOutputService } from 'src/static-table/draw/gacha_output/gacha_output.service';

@Injectable()
export class GachaDrawService {
  constructor(
    private readonly rewardOfferService: RewardOfferService,
    //private readonly itemService: ItemService,
    private readonly gachaService: GachaService,
    private readonly gachaOutputService: GachaOutputService,
    private readonly dataSource: DataSource,
  ) {}
}
