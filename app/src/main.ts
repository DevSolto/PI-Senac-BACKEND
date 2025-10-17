import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './domain/auth/guards/jwt.guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(app.get(JwtAuthGuard));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
