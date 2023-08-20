import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";

config();  // Load variables from .env file into process.env

const port = process.env.PORT || 3000;

async function bootstrap() {
  console.log(`PORT: ${port}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
