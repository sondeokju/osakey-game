import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { Users } from '../entity/users.entity';

export const User = createParamDecorator(
  (data: keyof Users | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user as Users;
    //console.log('createParamDecorator', req.user);

    if (!user) {
      throw new InternalServerErrorException(
        'User 데코레이터는 AccessTokenGuard와 함께 사용해야합니다. Request에 user 프로터티가 존재하지 않습니다!',
      );
    }

    if (data) {
      return user[data];
    }
    return user;
  },
);
