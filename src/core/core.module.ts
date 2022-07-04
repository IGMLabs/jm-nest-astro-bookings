import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MonitorMiddleware } from './middlewares/monitor.middleware';
import { UtilsService } from './utils/utils.service';
import helmet from 'helmet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const mongoUser = "nest_user";
const mongoPass = "nest_password";
const mongoHost = "localhost:27017";
const mongoDB = "nest";
const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDB}?authSource=admin`;

const postgresOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nest_user',
  password: 'nest_password',
  database: 'nest',
  autoLoadEntities: true,
  synchronize: true

};


@Module({
  imports: [
    ThrottlerModule.forRoot({ttl: 60, limit: 10}),
    MongooseModule.forRoot(mongoUri),
    TypeOrmModule.forRoot(postgresOptions)
  ],
  providers: [UtilsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },],
  exports: [UtilsService]
})
export class CoreModule {
    public configure(consumer: MiddlewareConsumer){
        consumer.apply(MonitorMiddleware).forRoutes("*");
        consumer.apply(helmet()).forRoutes("*");
    }
}
