import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";

export class LocalStrategy extends PassportStrategy(Strategy) {

  public async verify(username: string, password: string): Promise<any> {
    return null;
  }

}