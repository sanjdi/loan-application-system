import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.businessService = {
      options: {
        port: process.env.BUSINESS_SERVICE_PORT,
        host: process.env.BUSINESS_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.loansService = {
      options: {
        port: process.env.LOANS_SERVICE_PORT,
        host: process.env.LOANS_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}