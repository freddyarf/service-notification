import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [PostsModule, EventsModule, SmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
