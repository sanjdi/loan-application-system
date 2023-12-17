import { Module } from '@nestjs/common';
import { ApplicationController } from './applications.controller';
import { ApplicationService } from './applications.service';
import { applicationProviders } from './applications.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ...applicationProviders],
  exports: [ApplicationService]
})
export class ApplicationModule {}