import { Module } from '@nestjs/common';
import { EventsService } from './service/events.service';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, EventsService]
})
export class EventsModule {}
