import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SteamStrategy } from "./strategies/steam_strategy";
import { UserService } from "../user/user_service";
import { ServerService } from "../server/server_service";
import { AuthService } from "./auth_service";
import { LocalStrategy } from "./strategies/local_strategy";
import { UserModule } from "../user/user_module";
import { ServerModule } from "../server/server_module";
import { AuthController } from "./auth_controller";

@Module({
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: "steam",
    }),
    
    UserModule,
    ServerModule,
  ],
  providers: [
    // LocalStrategy,
    // SteamStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
