import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { SessionEntity } from "../../session/session_entity";

export class AuthGuard implements CanActivate {

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session as SessionEntity;

    return !!session.entity;
  }

}
