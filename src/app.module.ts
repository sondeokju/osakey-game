import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/entity/users.entity';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_SCHEMA_KEY,
  ENV_DB_USERNAME_KEY,
  ENV_SYNCHRONIZE_KEY,
  ENV_KEEPCONNECTIONALIVE_KEY,
} from './common/const/env-keys.const';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_PATH } from './common/const/path.const';
import { LogMiddleware } from './common/middleware/log.middleware';
import { RolesGuard } from './users/guard/roles.guard';
import { AccessTokenGuard } from './auth/guard/bearer-token.guard';
import { ItemModule } from './static-table/item/item.module';
import { Item } from './static-table/item/entities/item.entity';
import { ItemEquipslotModule } from './static-table/item-equipslot/item-equipslot.module';
import { ItemEquipslot } from './static-table/item-equipslot/entities/item-equipslot.entity';
import { ItemGradeModule } from './static-table/item-grade/item-grade.module';
import { ItemGrade } from './static-table/item-grade/entities/item-grade.entity';
import { EquipStatModule } from './static-table/equip-stat/equip-stat.module';
import { EquipStat } from './static-table/equip-stat/entities/equip-stat.entity';
import { UserEquipmentModule } from './user-equipment/user-equipment.module';
import { UserEquipment } from './user-equipment/entities/user-equipment.entity';
import { UserEquipmentSlotModule } from './user-equipment-slot/user-equipment-slot.module';
import { UserEquipmentSlot } from './user-equipment-slot/entities/user-equipment-slot.entity';
import { Gacha } from './static-table/gacha/entities/gacha.entity';
import { GachaModule } from './static-table/gacha/gacha.module';
import { UserItemModule } from './user_item/user_item.module';
import { UserItem } from './user_item/entities/user_item.entity';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UserAdModule } from './user_ad/user_ad.module';
import { UserAd } from './user_ad/entities/user_ad.entity';
import { UserEventAttendanceModule } from './user_event_attendance/user_event_attendance.module';
import { UserEventAttendance } from './user_event_attendance/entities/user_event_attendance.entity';
import { MissionRoutineModule } from './static-table/mission_routine/mission_routine.module';
import { MissionRoutine } from './static-table/mission_routine/entities/mission_routine.entity';
import { MissionRoutineBonusModule } from './static-table/mission_routine_bonus/mission_routine_bonus.module';
import { MissionRoutineBonus } from './static-table/mission_routine_bonus/entities/mission_routine_bonus.entity';
import { MissionMainModule } from './static-table/mission_main/mission_main.module';
import { MissionMain } from './static-table/mission_main/entities/mission_main.entity';
import { MissionSubModule } from './static-table/mission_sub/mission_sub.module';
import { MissionSub } from './static-table/mission_sub/entities/mission_sub.entity';
import { UserQuest } from './user_quest/entity/user_quest.entity';
import { UserBattleModule } from './user_battle/user_battle.module';
import { UserBattle } from './user_battle/entities/user_battle.entity';
import { UserQuestModule } from './user_quest/user_quest.module';
import { MissionModule } from './static-table/mission/mission.module';
import { Mission } from './static-table/mission/entities/mission.entity';
import { ItemTypeModule } from './static-table/item_type/item_type.module';
import { ItemType } from './static-table/item_type/entities/item_type.entity';
import { MissionKindModule } from './static-table/mission_kind/mission_kind.module';
import { MissionKind } from './static-table/mission_kind/entities/mission_kind.entity';
import { MissionCategoryModule } from './static-table/mission_category/mission_category.module';
import { MissionCategory } from './static-table/mission_category/entities/mission_category.entity';
import { HeroModule } from './static-table/hero/hero.module';
import { Hero } from './static-table/hero/entities/hero.entity';
import { RewardModule } from './static-table/reward/reward.module';
import { Reward } from './static-table/reward/entities/reward.entity';
import { NpcModule } from './static-table/npc/npc.module';
import { Npc } from './static-table/npc/entities/npc.entity';
import { ControlTableModule } from './static-table/control_table/control_table.module';
import { RewardOfferModule } from './supervisor/reward_offer/reward_offer.module';
import { LogUrlModule } from './common/log_url/log_url.module';
import { LogUrl } from './common/log_url/entities/log_url.entity';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';
//import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { NpcLocationModule } from './static-table/npc_location/npc_location.module';
import { NpcLocation } from './static-table/npc_location/entities/npc_location.entity';

@Module({
  imports: [
    //PrometheusModule.register(),
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'localhost',
        port: 6379,
        //password: 'bitnami',
      },
    }),

    TypeOrmModule.forRoot({
      //type: 'postgres',
      type: 'mysql',
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY]),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      timezone: 'Asia/Seoul',
      entities: [
        Users,
        Item,
        ItemEquipslot,
        ItemGrade,
        EquipStat,
        UserEquipment,
        UserEquipmentSlot,
        Gacha,
        Reward,
        Mission,
        ItemType,
        MissionKind,
        MissionCategory,
        Hero,
        Npc,
        NpcLocation,
        LogUrl,
        UserItem,
        UserAd,
        UserEventAttendance,
        MissionRoutine,
        MissionRoutineBonus,
        MissionMain,
        MissionSub,
        UserQuest,
        UserBattle,
      ],
      //synchronize: true,
      // keepConnectionAlive: true,
      synchronize: process.env[ENV_SYNCHRONIZE_KEY] === 'true' ? true : false,
      keepConnectionAlive:
        process.env[ENV_KEEPCONNECTIONALIVE_KEY] === 'true' ? true : false,
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    ItemModule,
    ItemEquipslotModule,
    ItemGradeModule,
    EquipStatModule,
    UserEquipmentModule,
    UserEquipmentSlotModule,
    GachaModule,
    UserItemModule,
    UserAdModule,
    UserEventAttendanceModule,
    RewardModule,
    MissionRoutineModule,
    MissionRoutineBonusModule,
    MissionMainModule,
    MissionSubModule,
    UserQuestModule,
    UserBattleModule,
    MissionModule,
    ItemTypeModule,
    MissionKindModule,
    MissionCategoryModule,
    HeroModule,
    RewardModule,
    NpcModule,
    ControlTableModule,
    RewardOfferModule,
    LogUrlModule,
    NpcLocationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LogMiddleware).forRoutes({
    //   //path: 'posts*',
    //   path: '*',
    //   method: RequestMethod.ALL,
    // });
    consumer.apply(RequestLoggingMiddleware).forRoutes('*'); // 모든 경로에 적용
  }
}
