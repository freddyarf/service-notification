import { WebSocketGateway } from '@nestjs/websockets';
import { SmsService } from './service/sms.service';

@WebSocketGateway({cors: true, namespace: '/sms'})
export class SmsGateway {
  constructor(private readonly smsService: SmsService) {}
}
