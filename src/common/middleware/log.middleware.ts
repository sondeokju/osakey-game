import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logMessage = `[REQ] ${req.url}   ${JSON.stringify(req.body)} ${
      req.method
    }  ${new Date().toLocaleString('kr')}`;
    console.log(logMessage);
    //console.log(req);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const logsPath = '../../../logs';
    const datePath = `${year}-${month}-${day}`;
    const folderPath = path.join(__dirname, '../../../', 'logs');
    const dailyPath = path.join(__dirname, `${logsPath}/${year}`, datePath);
    const yearPath = path.join(__dirname, logsPath, `${year}`);

    fs.mkdir(folderPath, () => {});
    fs.mkdir(yearPath, () => {});
    fs.mkdir(dailyPath, () => {});

    const logFilePath = path.join(
      __dirname,
      logsPath,
      `${year}/${datePath}`,
      `${req.method}-${datePath}.log`,
    );

    fs.appendFile(logFilePath, logMessage + '\n', (err) => {
      if (err) {
        //console.error('로그를 추가하는 동안 오류가 발생했습니다:', err);
      } else {
        //console.log('로그가 파일에 추가되었습니다.');
      }
    });

    next();
  }
}
