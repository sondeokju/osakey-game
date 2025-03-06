import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entity/users.entity';
import { v4 as uuidv4 } from 'uuid'; // uuid v4를 가져옵니다.

import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import {
  ENV_HASH_ROUNDS_KEY,
  ENV_JWT_SECRET_KEY,
} from 'src/common/const/env-keys.const';

import { GoogleService } from './sns/google/google.service';
import { AppleService } from './sns/apple/apple.service';
import { QueryRunner } from 'typeorm';
import { ZLoginLogService } from 'src/game_log/login/z_login_log/z_login_log.service';
import { DataSource } from 'typeorm';
import { InvenService } from 'src/supervisor/inven/inven.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly googleService: GoogleService,
    private readonly appleService: AppleService,
    private readonly zLoginLogService: ZLoginLogService,
    private readonly dataSource: DataSource,
    private readonly invenService: InvenService,
  ) {}

  /**
   * 토큰을 사용하게 되는 방식
   *
   * 1) 사용자가 로그인 또는 회원가입을 진행하면 accessToken과 refreshToken을 발급받는다.
   * 2) 로그인 할때는 Basic 코큰과 함께 요청을 보낸다.
   *    Basic 토큰은 '이메일:비밀번호'를 Base64로 인코딩한 형태이다.
   *    예) {authorization: 'Basic {token}'}
   * 3) 아무나 접근 할 수 없는 정보 (private route)를 접근 할때는 accessToken을 Header에 추가해서 요청과 함께 보낸다.
   *    예) {authorization: 'Bearer {token}'}
   * 4) 토큰과 요청을 함께 받은 서버는 토큰 검증을 통해 현재 요청을 보낸 사용자가 누구인지 알 수 있다.
   *    예를 들어서 현재 로그인한 사용자가 작성한 포스트만 가져오려면 토큰의 sub 값에 입력돼있는 사용자의 포스트만 따로 필터링 할 수 있다.
   *    특정 사용자의 토큰이 없다면 다른 사용자의 데이터를 접근 못한다.
   * 5) 모즌 토큰은 만료 기간이 있다. 만료기간이 지나면 새로 토큰을 발급받아야한다. 그렇지 않으면 jwtService.verify()에서 인증이 통과가 안된다.
   *    그러니 access 토근을 새로 발급 받을 수 있는 /auth/token/access와 refresh 토큰을 새로 발급 받을 수 있는
   *    /auth/token/refresh가 필요하다.
   *  6) 토큰이 만료되면 각각의 토큰을 새로 발급 받을 수 ㅣㅇㅆ는 엔드포인트에 요청을 해서
   *    새로운 토큰을 발급받고 새로운 토큰을 사용해서 private route에 접근한다.  *
   *
   */

  /**
   * Header로 부터 토큰을 받을때
   *
   * {authorization: 'Basic {token}'}
   * {authorization: 'Bearer {token}'}
   *
   *
   *
   */

  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    const token = splitToken[1];

    return token;
  }

  async socialLogin(
    device_id: string,
    email: string,
    os_type: string,
    //sub: string,
    language: string,
  ) {
    return await this.usersService.lineSocialLogin(
      device_id,
      email,
      os_type,
      //  sub,
      language,
    );
  }

  async lineSocialLogin(
    member_id: string,
    social_user_id: string,
    provider: string,
    language: string,
  ) {
    const userData = await this.usersService.lineSocialLogin(
      member_id,
      social_user_id,
      provider,
      language,
    );
    const login = await this.loginUser(userData);

    let lastLoginlog = await this.zLoginLogService.getLoginLog(
      userData.user_id,
    );

    // if (!lastLoginlog) {
    //   lastLoginlog.update_at = new Date();
    // }
    await this.zLoginLogService.loginLog(
      userData.user_id,
      member_id,
      social_user_id,
      provider,
    );

    // console.log('lastLoginlog.update_at :', lastLoginlog.update_at);
    // await this.usersService.userAccountTypeModify(
    //   userData.user_id,
    //   lastLoginlog.update_at,
    // );

    const [inven, user] = await Promise.all([
      this.invenService.getUserInventoryAll(userData.user_id),
      this.getUser(userData.user_id),
    ]);

    return {
      accessToken: login.accessToken,
      user,
      inven: inven,
    };
  }

  // async multiSocialLogin(
  //   email: string,
  //   device_id: string,
  //   member_id: string,
  //   provider: string,
  // ) {
  //   const userData = await this.usersService.findOrCreateUser(
  //     email,
  //     device_id,
  //     member_id,
  //     provider,
  //   );

  //   // await this.zLoginLogService.loginLog(
  //   //   userData.user_id,
  //   //   member_id,
  //   //   social_user_id,
  //   //   name,
  //   // );

  //   const inven = await this.invenService.getUserInventoryAll(userData.user_id);
  //   const user = await this.getUser(userData.user_id);
  //   const login = this.loginUser(userData);
  //   const loginObj = JSON.parse(login);

  //   return {
  //     accessToken: loginObj.accessToken,
  //     user,
  //     inven: inven,
  //   };
  // }

  async getUser(user_id: string) {
    const userDataArray = await this.dataSource.query(
      `SELECT * FROM users WHERE user_id = ?`,
      [user_id],
    );

    console.log('user', userDataArray[0]);
    return userDataArray[0] ?? null;
  }

  async getUserInvens(user_id: string) {
    const missionDataArray = await this.dataSource.query(
      `SELECT * FROM user_mission WHERE user_id = ?`,
      [user_id],
    );

    const equipDataArray = await this.dataSource.query(
      `SELECT * FROM user_equip WHERE user_id = ?`,
      [user_id],
    );

    const suitDataArray = await this.dataSource.query(
      `SELECT * FROM user_suit WHERE user_id = ?`,
      [user_id],
    );

    const itemDataArray = await this.dataSource.query(
      `SELECT * FROM user_item WHERE user_id = ?`,
      [user_id],
    );

    const offlineRewardDataArray = await this.dataSource.query(
      `SELECT * FROM user_offline_reward WHERE user_id = ?`,
      [user_id],
    );

    // const tunaTvOnlineDataArray = await this.dataSource.query(
    //   `SELECT * FROM user_tuna_tv_online WHERE user_id = ?`,
    //   [user_id],
    // );

    const tunaTvDataArray = await this.dataSource.query(
      `SELECT * FROM user_tuna_tv WHERE user_id = ?`,
      [user_id],
    );

    const snsRewardDataArray = await this.dataSource.query(
      `SELECT * FROM user_sns_reward WHERE user_id = ?`,
      [user_id],
    );

    const snsLikesDataArray = await this.dataSource.query(
      `SELECT * FROM user_sns_likes WHERE user_id = ?`,
      [user_id],
    );

    const snsLevelDataArray = await this.dataSource.query(
      `SELECT * FROM user_sns_level WHERE user_id = ?`,
      [user_id],
    );

    const npcFriendshipDataArray = await this.dataSource.query(
      `SELECT * FROM user_npc_friendship WHERE user_id = ?`,
      [user_id],
    );

    const mission = missionDataArray ?? null;
    const equip = equipDataArray ?? null;
    const suit = suitDataArray ?? null;
    const item = itemDataArray ?? null;
    const offlineReward = offlineRewardDataArray ?? null;
    //const tunaTvOnline = tunaTvOnlineDataArray ?? null;
    const tunaTv = tunaTvDataArray ?? null;
    const snsReward = snsRewardDataArray ?? null;
    const snsLikes = snsLikesDataArray ?? null;
    const snsLevel = snsLevelDataArray ?? null;
    const npcFriendship = npcFriendshipDataArray ?? null;

    return {
      mission,
      equip,
      suit,
      item,
      offlineReward,
      tunaTv,
      snsReward,
      snsLikes,
      snsLevel,
      npcFriendship,
    };
  }

  // async handleGoogleCallback(code: string) {
  //   const userInfo = await this.googleService.google(code);

  //   return await this.socialLoginAndSignup(userInfo.email, userInfo.sub, 'A');
  // }

  async handleAppleCallback(code: string, id_token: string) {
    const userInfo = await this.appleService.apple(code, id_token);

    //return await this.socialLoginAndSignup(userInfo.email, userInfo.sub, 'I');
  }

  /**
   * Basic aldkjkfkdkjkkjkjdfd
   *
   * 1) aldkjkfkdkjkkjkjdfd -> email:password
   * 2) email:password -> [email, password]
   * 3) {email: email, password: password}
   *
   */
  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf-8');
    //console.log('decoded', decoded);

    const split = decoded.split(':');
    //console.log('split', split);
    //console.log('split.length', split.length);

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    const email = split[0];
    //console.log('email', email);
    const password = split[1];
    //console.log('password', password);

    return {
      email,
      password,
    };
  }

  /**
   * 토큰 검증
   */

  verifyToken(token: string) {
    console.log('token', token);
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      });
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료됐거나 잘못된 토큰입니다.');
    }
  }

  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
    });

    /**
     * sub: id
     * email: emial,
     * type: 'access' | 'refres'
     */
    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 Refresh 토큰으로만 가능합니다!',
      );
    }

    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }

  /**
   * 만드려는 기능
   *
   * 1) registerWithEmail
   *    - email, nickname, password를 입력받고 사용자를 생성한다.
   *    - 생성이 완료되면 accessToken과 refreshToken을 반환한다.
   *
   * 2) loginWithEmail
   *    - email, password를 입력하면 사용자 검증을 진행한다.
   *    - 검증이 완료되면 accessToken과 refreshToken을 반환한다.
   *
   * 3) loginUser
   *    - (1)과 (2)에서 필요한 accessToken과 refreshToken을 반환하는 로직
   *
   * 4) signToken
   *    - (3)에서 필요한 accessToken과 refreshToken을 sign하는 로직
   *
   * 5) authenticateWithEmailAndPassword
   *    - (2) 에서 로그인을 진행할때 필요한 기본적인 검증 진행
   *    1.사용자가 존재하는지 확인 (email)
   *    2.비밀번호가 맞는지 확인
   *    3.모두 통과되면 찾은 상용자 정보 반환
   *    4.loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
   *
   */

  /**
   * Payload에 들어갈 정보
   *
   * 1) email
   * 2) sub -> id
   * 3) type : 'access' | 'refresh'
   *
   */
  //signToken(user: Pick<Users, 'email' | 'id'>, isRefreshToken: boolean) {
  signToken(user: Users, isRefreshToken: boolean) {
    const payload = {
      user_id: user.user_id,
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      // seconds
      //expiresIn: isRefreshToken ? 86400 : 86400,
      expiresIn: isRefreshToken ? 3.154e11 : 3.154e11,
    });
  }

  socialSignToken(
    user: Pick<Users, 'user_id' | 'id'>,
    isRefreshToken: boolean,
  ) {
    console.log('socialSignToken', user);
    console.log('user.id', user.id);
    const payload = {
      user_id: user.user_id,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      // seconds
      //expiresIn: isRefreshToken ? 86400 : 86400,
      expiresIn: isRefreshToken ? 3.154e11 : 3.154e11,
    });
  }

  async loginUser(user: Users) {
    return {
      accessToken: this.signToken(user, false),
    };
  }

  //loginUser(user: Pick<Users, 'email' | 'id'>) {
  // async loginUser(user: Users) {
  //   const result = {
  //     accessToken: this.signToken(user, false),
  //   };

  //   //console.log('uuid', uuidv4());

  //   return JSON.stringify(result);
  //   // return {
  //   //   accessToken: this.signToken(user, false),
  //   //   //refreshToken: this.signToken(user, true),
  //   // };
  // }

  loginUserID(user: Pick<Users, 'user_id' | 'id'>) {
    const result = {
      accessToken: this.socialSignToken(user, false),
    };

    //console.log('uuid', uuidv4());

    return JSON.stringify(result);
    // return {
    //   accessToken: this.signToken(user, false),
    //   //refreshToken: this.signToken(user, true),
    // };
  }

  socialLoginUseToken(user: Pick<Users, 'user_id' | 'id'>) {
    const result = {
      accessToken: this.socialSignToken(user, false),
    };

    return JSON.stringify(result);
  }

  async authenticateWithEmailAndPassword(
    user: Pick<Users, 'email' | 'password'>,
  ) {
    /**
     *    1.사용자가 존재하는지 확인 (email)
     *    2.비밀번호가 맞는지 확인
     *    3.모두 통과되면 찾은 상용자 정보 반환
     */

    const existingUser = await this.usersService.getUserByEmail(
      user.email.replace(/\s+/g, ''),
    );
    console.log(existingUser);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    /**
     *
     * 1) 입력된 비밀번호
     * 2)기존 해시 (hash) -> 사용자 정보에 저장돼있는 hash
     */
    //const passOK = bcrypt.compare(user.password, existingUser.password);
    // bcrypt.compare(user.password, existingUser.password, (err, result) => {
    //   console.log('result:', result);
    //   if (err) {
    //     console.error('비밀번호 비교 중 오류 발생:', err);
    //     return;
    //   }

    //   if (result === true) {
    //     console.log('비밀번호 일치');
    //   } else {
    //     console.log('비밀번호 불일치');
    //   }
    // });

    //console.log(user.password, existingUser.password);

    // if (!passOK) {
    //   throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    // }

    return existingUser;
  }

  async loginWithEmail(user: Pick<Users, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);
    //console.log('existingUser', existingUser);

    return this.loginUser(existingUser);
  }

  async registerWithEmail(user: RegisterUserDto) {
    const hash = await bcrypt.hash(
      user.password,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS_KEY)),
    );

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    // const newUserEquipmentSlot =
    //   await this.userEquipmentSlotService.createEquipmentSlot(newUser.id);
    // console.log('newUserEquipmentSlot', newUserEquipmentSlot);

    return this.loginUser(newUser);
  }

  async socialLoginAndSignup(
    device_id: string,
    email: string,
    os_type: string,
    pgs_id: string,
  ) {
    // 유저 생성 및 로그인
    return await this.usersService.socialLoginSaveUser(
      device_id,
      email,
      os_type,
      pgs_id,
    );
  }

  // async socialLoginAndSignup(email: string, pgs_id: string, os_type: string) {
  //   // 유저 생성 및 로그인
  //   const existUser = await this.usersService.getUserByEmail(email);

  //   if (existUser) {
  //     const credentials = { email: email, password: '' };
  //     return await this.loginWithEmail(credentials);
  //   } else {
  //     const newUserData = await this.usersService.createUserOsakey(
  //       email,
  //       pgs_id,
  //       os_type,
  //     );

  //     await this.usersService.createUserID(newUserData.email);

  //     const newLoginUser = { email: newUserData.email, password: '' };
  //     return await this.loginWithEmail(newLoginUser);
  //   }
  // }
}
