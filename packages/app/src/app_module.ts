import * as path from "path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DbOptionsProvider } from "./config/db_options_provider";
import { SessionModule } from "./session/session_module";
import { ServerModule } from "./server/server_module";
import { AuthModule } from "./auth/auth_module";
import { UserModule } from "./user/user_module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbOptionsProvider,
    }),
    
    AuthModule,
    UserModule,
    SessionModule,
    ServerModule,
    
    ServeStaticModule.forRoot({
      rootPath: path.join(require.resolve("@maam/app-frontend/package.json"), "../dist"),
    })
  ],
})
export class AppModule {}
