import { Module } from '@nestjs/common';
import { SmsService } from './service/sms.service';
import { SmsGateway } from './sms.gateway';

@Module({
  providers: [SmsGateway, SmsService]
})
export class SmsModule {}
