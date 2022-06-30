import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CoreModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
