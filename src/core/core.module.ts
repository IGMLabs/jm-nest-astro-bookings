import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MonitorMiddleware } from './middlewares/monitor.middleware';

@Module({})
export class CoreModule {
    public configure(consumer: MiddlewareConsumer){
        consumer.apply(MonitorMiddleware).forRoutes("*");
    }
}
