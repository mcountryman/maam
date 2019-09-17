import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SteamStrategy } from "./strategies/steam_strategy";

@Module({
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: "steam",
    }),
  ],
  providers: [
    // LocalStrategy,
    SteamStrategy,
  ],
})
export class AuthModule {}
