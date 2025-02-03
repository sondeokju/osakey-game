import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  //RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  //ENV_DB_SCHEMA_KEY,
  ENV_DB_USERNAME_KEY,
  ENV_SYNCHRONIZE_KEY,
  ENV_KEEPCONNECTIONALIVE_KEY,
} from './common/const/env-keys.const';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_PATH } from './common/const/path.const';
//import { LogMiddleware } from './common/middleware/log.middleware';
import { RolesGuard } from './users/guard/roles.guard';
import { AccessTokenGuard } from './auth/guard/bearer-token.guard';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';
import { entities } from './entity_group/entity';
import { entities_module } from './entity_group/entity_module';
import { InvenModule } from './supervisor/inven/inven.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      //rootPath: join(__dirname, '..', 'public'), // src와 dist 모두 지원
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
      type: 'mysql',
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY]),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      timezone: 'Asia/Seoul',
      entities: entities,
      //synchronize: true,
      // keepConnectionAlive: true,
      //logging: ['schema'],
      synchronize: process.env[ENV_SYNCHRONIZE_KEY] === 'true' ? true : false,
      keepConnectionAlive:
        process.env[ENV_KEEPCONNECTIONALIVE_KEY] === 'true' ? true : false,
    }),
    ...entities_module,
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
