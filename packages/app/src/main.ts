import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app_module";
import { AppConfig } from "./app_config";
import { SessionMiddleware } from "./session/session_middleware";
import helmet = require("helmet");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  
  await app.listen(AppConfig.HTTP_PORT);
}

bootstrap();
