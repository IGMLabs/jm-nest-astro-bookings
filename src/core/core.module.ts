import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MonitorMiddleware } from './middlewares/monitor.middleware';
import { UtilsService } from './utils/utils.service';
import helmet from 'helmet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot({ttl: 60, limit: 10})],
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
