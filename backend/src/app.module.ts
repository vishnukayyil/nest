// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // Loads .env and makes ConfigService available globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Connect Mongoose using MONGO_URI from .env (fallback to local)
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager', {
      // optional mongoose options
      autoCreate: true,
    }),

    // Your tasks feature
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
