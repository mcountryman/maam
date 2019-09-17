import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Session,
  UnauthorizedException
} from "@nestjs/common";
import { SessionEntity } from "../session/session_entity";
import { ServerService } from "./server_service";
import { ServerEntity } from "../server/server_entity";
import { DeepPartial } from "typeorm";

@Controller("server")
export class ServerController {
  constructor(
    private readonly _serverService: ServerService,
  ) {}
  
  @Get()
  public async getServer(
    @Session() session: SessionEntity,
  ): Promise<any> {
    if (session.serverEntity) {
      return await this._serverService.findById(session.serverEntity.id);
    }
  }
  
}