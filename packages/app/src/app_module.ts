import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbOptionsProvider } from "./config/db_options_provider";
import { SessionModule } from "./session/session_module";
import { ServerModule } from "./server/server_module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbOptionsProvider,
    }),
    
    SessionModule,
    ServerModule,
  ],
})
export class AppModule {}
