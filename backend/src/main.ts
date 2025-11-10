// // src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // enable CORS so your frontend (localhost:3000 or 5173) can call backend
//   app.enableCors({
//     origin: true, // or specify ['http://localhost:3000'] for tighter security
//   });

//   // set global prefix to /api so endpoints are /api/tasks
//   app.setGlobalPrefix('api');

//   // enable validation for DTOs
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

//   const port = process.env.PORT ? Number(process.env.PORT) : 5000;
//   await app.listen(port);
//   console.log(`Server listening on http://localhost:${port}/api`);
// }
// bootstrap();
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true }); // ✅ Allow frontend requests
  app.setGlobalPrefix('api'); // ✅ Makes routes start with /api
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
