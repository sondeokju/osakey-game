// status-monitor.config.ts
import { StatusMonitorConfiguration } from 'nestjs-status-monitor';

export const statusMonitorConfig: StatusMonitorConfiguration = {
  title: 'NestJS Monitoring', // 대시보드 페이지 제목
  port: 3000, // 서버가 실행되는 포트
  path: '/status', // 모니터링 경로 (/status로 접근 가능)
  ignoreStartsWith: '/heath/alive', // 특정 경로 무시 가능
  spans: [
    {
      interval: 1, // 매 초마다 수집
      retention: 60, // 1분 동안 데이터 유지
    },
    {
      interval: 5,
      retention: 60,
    },
    {
      interval: 15,
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [],
  socketPath: '',
};
