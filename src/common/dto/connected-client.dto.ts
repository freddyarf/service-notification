import { Socket } from "socket.io"
import { User } from "./user.dto"

export class ConnectedClient {
    
    [id: string]: {
        socket: Socket,
        user: User
    }
}