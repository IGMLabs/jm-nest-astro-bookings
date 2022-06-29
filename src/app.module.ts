import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from './core/core.module';
import { AgenciesService } from './agencies/agencies.service';
import { AgenciesModule } from './agencies/agencies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, AgenciesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AgenciesService],
})
export class AppModule {}
