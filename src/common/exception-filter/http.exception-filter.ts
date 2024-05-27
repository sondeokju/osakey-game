import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const error = exception.getResponse();

    // 로그 파일을 생성하거나
    // 에러 모니터링 시스템에 API 콜 하기

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const logsPath = '../../../logs';
    const datePath = `${year}-${month}-${day}`;
    const folderPath = path.join(__dirname, '../../../', 'logs/error');

    fs.mkdir(folderPath, () => {});

    const logFilePath = path.join(
      __dirname,
      logsPath,
      'error',
      `${datePath}.log`,
    );

    const logMessage = `[ERROR] ${JSON.stringify(error)} [URL] ${
      request.url
    } ${new Date().toLocaleString('kr')}`;

    fs.appendFile(logFilePath, logMessage + '\n', () => {});

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toLocaleString('kr'),
      path: request.url,
    });
  }
}
