import { Controller, Get, Req, Session } from "@nestjs/common";
import { Request } from "express";
import { SessionEntity } from "@maam/app/src/session/session_entity";

@Controller("server")
export class ServerController {
  @Get()
  public async getServers(@Session() session: SessionEntity): Promise<any> {
    return session.serverId;
  }
}