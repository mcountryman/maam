import * as path from "path";
import { Strategy } from "passport-steam";
import { Injectable, NotImplementedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserEntity } from "../../user/user_entity";

export interface ISteamProfile {
  id: string;
  photos: any[];
  provider: "steam";
  displayName: string;
}

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      realm: "",
      apiKey: "",
      returnURL: "",
    });
  }

  public async validate(identifier: string, profile: ISteamProfile): Promise<UserEntity> {
    throw new NotImplementedException();
  }

}
