import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServerEntity } from "./server_entity";
import { ServerController } from "./server_controller";
import { ServerService } from "./server_service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity]),
  ],
  exports: [ServerService],
  providers: [ServerService],
  controllers: [ServerController],
})
export class ServerModule {}