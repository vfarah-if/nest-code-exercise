import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy'
import { PassportModule } from '@nestjs/passport'
import { config } from '../../../config'
@Module({
  imports: [
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: config.sapApi.jwt_secret,
      // TODO: Check what this value
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
