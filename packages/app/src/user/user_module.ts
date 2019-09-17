import { Module } from "@nestjs/common";
import { UserService } from "./user_service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user_entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [],
})
export class UserModule {}
