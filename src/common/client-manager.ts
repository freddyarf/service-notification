import { Socket } from 'socket.io';
import { User } from './dto/user.dto';
import { ConnectedClient } from './dto/connected-client.dto';

export abstract class ClientManager {

    private connectedClients: ConnectedClient = {}

    connectClient( client: Socket, userName: string ) {

        let user: User = new User();
        user.userName = userName;

        this.checkUserConnection( user );

        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
    }

    disconnectClient( clientId: string ) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        let users = [];
        for (const clientId of Object.keys( this.connectedClients ) ) {
            const connectedClient = this.connectedClients[clientId];
            users.push(connectedClient.user.userName);
        }
        return users;
    }

    getUserNameClient( socketId: string ) {
        return this.connectedClients[socketId].user.userName;
    }

    private checkUserConnection( user: User ) {

        for (const clientId of Object.keys( this.connectedClients ) ) {
            
            const connectedClient = this.connectedClients[clientId];

            if ( connectedClient.user.userName === user.userName ) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
}
