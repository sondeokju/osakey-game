import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get('/')
  checkHealth() {
    console.log('hello osakey');
    return `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>데이터 전송 페이지</title>
    </head>
    <body>
        <h1>게임 센터 데이터 전송</h1>
        <form action="http://서버주소/api/submit" method="POST">
            <label for="user_id">User ID:</label>
            <input type="text" id="user_id" name="user_id" required><br><br>

            <label for="device_id">Device ID:</label>
            <input type="text" id="device_id" name="device_id" required><br><br>

            <label for="game_center_id">게임 센터 아이디:</label>
            <input type="text" id="game_center_id" name="game_center_id" required><br><br>

            <button type="submit">전송</button>
        </form>
    </body>
    </html>`;
  }
}
