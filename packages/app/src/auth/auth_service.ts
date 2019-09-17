import { Injectable } from "@nestjs/common";
import { IAuthEntity } from "./iauth_entity";
import { UserEntity } from "../user/user_entity";
import { UserService } from "../user/user_service";

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
  ) {}

  public async authUser(request: any, username: string, password: string): Promise<UserEntity> {
    const user = await this._userService.findByCredentials(username, password);
    if (!user) {
      return null;
    }

    await this.authEntity(request, user);

    return user;
  }

  public async authEntity(request: any, entity: IAuthEntity): Promise<IAuthEntity> {
    // TODO: Check entity already auth'd
    return request.session.entity = entity;
  }

}
