import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwTStrategy } from './jwt.strategy';

@Module({
  imports : [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: 'Secret0618',
      signOptions:{
        expiresIn:3600
      }
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwTStrategy],
  exports: [JwTStrategy, PassportModule]
})
export class AuthModule {}
