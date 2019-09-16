import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as session from "express-session";
import { Repository } from "typeorm";
import { SessionEntity } from "./session_entity";
import { AppConfig } from "../app_config";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeormStore as TypeOrmStore } from "typeorm-store";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  
  constructor(
    @InjectRepository(SessionEntity)
    repository: Repository<SessionEntity>,
  ) {
    this.use = session({
      store: new TypeOrmStore({ repository }),
      resave: false,
      secret: AppConfig.HTTP_SESSION_SECRET,
      saveUninitialized: true,
    });
  }
  
  public use: (req: Request, res: Response, next: () => void) => any;
}
