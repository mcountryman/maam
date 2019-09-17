import * as helmet from "helmet";
import * as session from "express-session";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app_module";
import { AppConfig } from "./app_config";
import { SessionStore } from "./session/session_store";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const store = app.get(SessionStore);
  
  app.use(helmet());
  app.use(session({
    store,
    resave: false,
    secret: AppConfig.HTTP_SESSION_SECRET,
    saveUninitialized: true,
  }));
  app.enableCors({
    origin: "localhost",
    methods: ["OPTIONS", "HEAD", "GET"],
  });
  
  await app.listen(AppConfig.HTTP_PORT);
}

bootstrap();
