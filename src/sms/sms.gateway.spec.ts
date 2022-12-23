import { Test, TestingModule } from '@nestjs/testing';
import { SmsGateway } from './sms.gateway';
import { SmsService } from './sms.service';

describe('SmsGateway', () => {
  let gateway: SmsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsGateway, SmsService],
    }).compile();

    gateway = module.get<SmsGateway>(SmsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
