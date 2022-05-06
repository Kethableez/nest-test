import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  server.setGlobalPrefix('/api/v1');

  const docConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const serverConfig = server.get(ConfigService);

  const document = SwaggerModule.createDocument(server, docConfig);
  SwaggerModule.setup('docs', server, document);

  server.useGlobalPipes(new ValidationPipe());
  await server.listen(serverConfig.get('server.port'));
}
bootstrap();
