import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './service/events.service';

@WebSocketGateway({cors: true, namespace: '/events'})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private wss: Server;

  constructor(
    private readonly eventsService: EventsService
  ) {}
  
  handleConnection(client: Socket, ...args: any[]) {
    
    const userName = client.handshake.headers.username as string;

    try {
      this.eventsService.connectClient( client, userName);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.eventsService.getConnectedClients() );
    Logger.log('Client connected to events', client.id);
  }

  handleDisconnect(client: any) {

    this.eventsService.disconnectClient( client.id );
    this.wss.emit('clients-updated', this.eventsService.getConnectedClients() );

    Logger.log('Client disconnected from events', client.id);
  }

  @SubscribeMessage('event-from-client')
  onMessageFromClient( client: Socket, payload: CreateEventDto ) {
  
    this.wss.emit('event-from-server', {
      fullName: this.eventsService.getUserNameClient(client.id),
      message: payload.message || 'no-message!!'
    });
  }
}
