import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionEntity } from "./session_entity";
import { SessionMiddleware } from "./session_middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
    ]),
  ],
  providers: [SessionMiddleware],
})
export class SessionModule implements NestModule {

  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(SessionMiddleware)
      .forRoutes("*")
    ;
  }

}
