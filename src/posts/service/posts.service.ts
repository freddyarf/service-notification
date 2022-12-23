import { Injectable } from '@nestjs/common';
import { ClientManager } from '../../common/client-manager';

@Injectable()
export class PostsService extends ClientManager {
}
