import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // BoardsModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
    }),
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.TOKEN_SECRET,
    //   signOptions: { expiresIn: '15m' },
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
