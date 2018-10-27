import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Sää Vai API')
    .setDescription('API docs for Sää Vai Application')
    .setVersion('0.0.0')
    .addTag('user')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use('/api/docs', (req, res) => res.send(document));
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
