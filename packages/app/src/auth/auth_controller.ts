import { Body, Controller, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth_service";
import { ServerService } from "../server/server_service";
import { SessionEntity } from "../session/session_entity";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _serverService: ServerService,
  ) {}

  @Post("server")
  public async authServer(
    @Req() request: any,
    @Body("apiKey") apiKey: string,
  ): Promise<void> {
    const server = await this._serverService.findByApiKey(apiKey);
    if (!server) {
      throw new UnauthorizedException();
    }

    await this._authService.authEntity(request, server);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  public async login(@Req() request): Promise<void> {
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    await this._authService.authEntity(request, user);
  }

  @UseGuards(AuthGuard("steam"))
  @Post("loginSteam")
  public async loginSteam(@Req() request): Promise<void> {
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    await this._authService.authEntity(request, user);
  }

}
