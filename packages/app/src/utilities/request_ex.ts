import { Request } from "express";
import { SessionEntity } from "../session/session_entity";
import { IAuthEntity } from "../auth/iauth_entity";

export interface RequestEx extends Request {
  entity?: IAuthEntity;
  session: any; // SessionEntity;
}
