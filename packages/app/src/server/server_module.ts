import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServerEntity } from "./server_entity";
import { ServerController } from "./server_controller";

@Module({
  imports: [TypeOrmModule.forFeature([ServerEntity])],
  controllers: [ServerController],
})
export class ServerModule {}