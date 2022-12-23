import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './service/posts.service';

@WebSocketGateway({cors: true, namespace: '/posts'})
export class PostsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private wss: Server;

  constructor(
    private readonly postsService: PostsService
  ) {}
  
  handleConnection(client: Socket, ...args: any[]) {
    
    const userName = client.handshake.headers.username as string;

    try {
      this.postsService.connectClient( client, userName);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.postsService.getConnectedClients() );

    Logger.log('Client connected to posts', client.id);
  }

  handleDisconnect(client: any) {

    this.postsService.disconnectClient( client.id );
    this.wss.emit('clients-updated', this.postsService.getConnectedClients() );

    Logger.log('Client disconnected from posts', client.id);
  }

  @SubscribeMessage('post-from-client')
  onMessageFromClient( client: Socket, payload: CreatePostDto ) {
  
    this.wss.emit('post-from-server', {
      fullName: this.postsService.getUserNameClient(client.id),
      message: payload.message || 'no-message!!'
    });
  }
}