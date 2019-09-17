import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionStore } from "./session_store";
import { SessionEntity } from "./session_entity";
import { SessionService } from "./session_service";

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
  ],
  providers: [
    SessionStore,
    SessionService,
  ],
})
export class SessionModule {}
