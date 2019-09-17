import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { SessionEntity } from "../../session/session_entity";
import { RequestEx } from "../../utilities/request_ex";

export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get<string[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest<RequestEx>();
    const session = request.session as SessionEntity;

    const entity = request.entity;
    const hasRole = () => entity.roles.some((role) => roles.includes(role));

    return entity && entity.roles && hasRole();
  }

}
