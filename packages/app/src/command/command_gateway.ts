import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway
} from "@nestjs/websockets";
import { Client } from "socket.io";
import { Repository } from "typeorm";
import { ServerEntity } from "../server/server_entity";
import { SessionEntity } from "../session/session_entity";

@WebSocketGateway()
export class CommandGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly _serverRepo: Repository<ServerEntity>,
  ) {}
  
  public async handleConnection(client: Client, ...args: any[]): Promise<any> {
    
    // Attempt to store server ws client reference
    let server = await this.getServer(client);
    if (server != null) {
      server.sockets.push(client);
    }
    
  }

  public async handleDisconnect(client: Client): Promise<any> {
    
    // Attempt to remove server ws client reference
    let server = await this.getServer(client);
    if (server != null) {
      let clientIdx = server.sockets.indexOf(client);
      if (clientIdx != -1) {
        server.sockets.splice(clientIdx, 1);
      }
    }
    
  }
  
  private async getServer(client: Client): Promise<ServerEntity | null> {
    let session = client.request.session as SessionEntity;
    if (session == null || session.serverId == null) {
      return null;
    }

    return await this._serverRepo.findOneOrFail(session.serverId);
  }
  
  // @SubscribeMessage("command_send")
  // public async handleCommand(client: Client, data: string): Promise<string> {
  //   return "";
  // }
  
}
